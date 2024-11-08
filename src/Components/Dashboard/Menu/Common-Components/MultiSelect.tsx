import React, { useEffect, useState } from "react";
import {
    Stack,
    OutlinedInput,
    InputLabel,
    MenuItem,
    Chip,
    Select,
    FormControl,
    Autocomplete,
    TextField
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";


interface Product {
    id: string | number;
    title: string;
}

interface MultiSelectProps {
    multiSelect: boolean;
    productList: Product[];
    setSelectedOption: React.Dispatch<React.SetStateAction<Product[]>>;
    disabled: boolean;
    selectedProductList: Product[];
    reportStatus: string;
    setReportStatus: React.Dispatch<React.SetStateAction<string>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    multiSelect,
    productList,
    setSelectedOption,
    disabled,
    selectedProductList,
    reportStatus,
    setReportStatus,
}) => {
    const [selectedNames, setSelectedNames] = useState<Product[]>(selectedProductList);

    useEffect(() => {
        setSelectedNames(selectedProductList);
    }, [selectedProductList])

    const handleOnSelect = (e) => {
        try {
            setSelectedNames(e.target.value);
            setSelectedOption(e.target.value);
            handleOnUpdatReportStatus();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnDelete = (value: any) => () => {
        try {
            // setSelectedNames(selectedNames.filter((item) => item !== value));
            setSelectedOption(selectedProductList.filter((item) => item !== value));
            handleOnUpdatReportStatus();
        } catch (error) {

        }
    }

    const handleOnUpdatReportStatus = () => {
        try {
            if (reportStatus === "success") {
                setReportStatus("updating");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <FormControl disabled={disabled} sx={{ m: 1, width: 500, marginX: 0, marginY: 0 }}>
            <InputLabel>Multiple Select</InputLabel>
            <Select
                multiple={multiSelect}
                value={selectedNames}
                onChange={handleOnSelect}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected) => (
                    <Stack gap={1} direction="row" flexWrap="wrap" maxHeight={"300px"} style={{ overflowY: "scroll" }}>
                        {selected.map((value, index) => (
                            <Chip
                                style={{ height: "25px", fontSize: "12px" }}
                                key={`${value.id}-${index}`}
                                label={value.title}
                                onDelete={handleOnDelete(value)}
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                }
                            />
                        ))}
                    </Stack>
                )}
            >
                {productList.map((product: Product, index: number) => (
                    <MenuItem title={product.title}
                        key={`${index}-${product.title}`}
                        value={product}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {product.title}
                        {selectedNames.map(v => v.id === product.id ? <CheckIcon color="info" /> : null)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelect;