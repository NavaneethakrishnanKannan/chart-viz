import React, { useEffect, useState } from "react";
import {
    Stack,
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import styled from "styled-components";


interface Category {
    name: string;
    slug: string;
}

interface SelectDropDownProps {
    productCategory: Category[];
    setSelectedOption: React.Dispatch<React.SetStateAction<Category>>;
    selectedCategory: Category | null;
    setselectedProductList: React.Dispatch<React.SetStateAction<any[]>>;
    setReportStatus: React.Dispatch<React.SetStateAction<string>>;
    setChartData: React.Dispatch<React.SetStateAction<any>>;
    onLoadAllData: () => void;
    setProductList: React.Dispatch<React.SetStateAction<any[]>>;
}

const ClearButton = styled.div`
    position: absolute;
    right: 25px;
`;

const SelectDropDown: React.FC<SelectDropDownProps> = (props) => {
    const { 
        productCategory, 
        setSelectedOption, 
        selectedCategory, 
        setselectedProductList, 
        setReportStatus, 
        setChartData, 
        onLoadAllData,
        setProductList
    } = props;

    const [selectedNames, setSelectedNames] = useState<Category | null>(selectedCategory);

    useEffect(() => {
        setSelectedNames(selectedCategory);
    }, [selectedCategory]);

    const handleOnSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
        try {
            const selected = e.target.value as Category;
            if (selectedCategory && selectedCategory.slug !== selected.slug) {
                setChartData({});
                setSelectedNames(selected);
                setSelectedOption(selected);
                setselectedProductList([]);
                setReportStatus("");
            } else if (!selectedCategory) {
                setSelectedNames(selected);
                setSelectedOption(selected);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnDelete = (e: React.MouseEvent) => {
        try {
            e.stopPropagation();
            setSelectedNames({});
            setSelectedOption({});
            setselectedProductList([]);
            setProductList([]);
            onLoadAllData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormControl sx={{ m: 1, width: 500, marginX: 0, marginY: 0 }}>
            <InputLabel>Multiple Select</InputLabel>
            <Select
                value={selectedNames}
                onChange={handleOnSelect}
                input={<OutlinedInput label="Multiple Select" />}
                renderValue={(selected: Category | null) => (
                    <Stack gap={1} direction="row" flexWrap="wrap" >
                        {selected?.name}
                        {selected && selected.name && (
                            <ClearButton>
                                <CloseOutlinedIcon onMouseDown={handleOnDelete} />
                            </ClearButton>
                        )}
                    </Stack>
                )}
            >
                {productCategory.map((category, index) => (
                    <MenuItem
                        key={`${index}-${category.slug}`}
                        value={category}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {category.name}
                        {selectedNames?.slug === category.slug && <CheckIcon color="info" />}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectDropDown;
