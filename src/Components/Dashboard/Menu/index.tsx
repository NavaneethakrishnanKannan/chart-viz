import React from 'react';
import MultiSelect from './Common-Components/MultiSelect.tsx';
import SelectDropDown from './Common-Components/Select.tsx';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const MenuContainer = styled.div`
margin: 20px;
width: calc(100% - 40px);
display: flex;
flex-direction: column;
gap: 20px;
height: calc(100vh - 60px);
border: 1px solid #c4c4c4;
border-radius: 4px;
padding: 10px;
`;

const HeaderContainer = styled.div`
width: 100%;
height: 60px;
display: flex;
align-items: center;
justify-content: space-between;
`;

const Header = styled.div``;

const HeaderTitle = styled.h3``;

const ClearFilter = styled.div<{ disabled: boolean }>`
opacity: ${props => props.disabled ? 0.5 : 1};
pointer-events: ${props => props.disabled ? "none" : "all"};
`;

const Clear = styled.div`
cursor: "pointer";
`;

const FilterContainer = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
height: calc(100% - 70px);
`;

const FilterCategory = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
`;

const FilterValue = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
`;

const MenuFooter = styled.div`
display: flex;
width: 100%;
height: 50px;
text-align: center;
margin-top: auto;
`;

export default function Menu(props) {

    let disabled = !Object.keys(props.selectedCategory).length;

    return (

        <MenuContainer>
            <HeaderContainer className='header-container'>
                <Header>
                    <HeaderTitle>Filter</HeaderTitle>
                </Header>
                <ClearFilter disabled={disabled}>
                    <Clear style={{ cursor: "pointer" }} onClick={props.onRemoveFilter}>Clear</Clear>
                </ClearFilter>
            </HeaderContainer>
            <FilterContainer>
                <FilterCategory>
                    <SelectDropDown productCategory={props.productCategory} selectedCategory={props.selectedCategory} setSelectedOption={props.setSelectedCategory} setselectedProductList={props.setselectedProductList} setReportStatus={props.setReportStatus} setChartData={props.setChartData} onLoadAllData={props.onLoadAllData} setProductList = {props.setProductList} />
                </FilterCategory>
                <FilterValue>
                    <MultiSelect multiSelect={true} productList={props.productList} setSelectedOption={props.setselectedProductList} disabled={disabled || !props.productList.length} selectedProductList={props.selectedProductList} reportStatus={props.reportStatus} setReportStatus={props.setReportStatus} />
                </FilterValue>
            </FilterContainer>
            <MenuFooter>
                <Button variant="contained" disabled={!Object.keys(props.selectedCategory).length || (props.reportStatus === "success" || props.reportStatus === "loading")} style={{ width: "100%" }} onClick={props.handleOnRunReport}>Run Report</Button>
            </MenuFooter>
        </MenuContainer>
    )

}