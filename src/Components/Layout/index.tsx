import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../Dashboard/Menu/index.tsx';
import { getProductData } from '../Helpers/APIHelpers.ts';
import Charts from '../Dashboard/Charts/index.tsx';
import { prepareBarChartData, preparePieChartData } from '../Helpers/chartHelpers.ts';
import styled from 'styled-components';
import Spinner from '../Dashboard/Menu/Common-Components/Spinner.tsx';

const LeftContainer = styled.div`
width: 25%;
display: flex;
flex-grow: 1;
min-width: 150px;
`;

const RightContainer = styled.div`
width: 75%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
`;

const ChartWrapper = styled.div`
margin: 20px;
width: calc(100% - 40px);
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
height: calc(100vh - 60px);
border: 1px solid #c4c4c4;
border-radius: 4px;
padding: 10px;
`;

const BASE_URL = `https://dummyjson.com/`;

export default function Layout() {

  const [productCategory, setProductCategory] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedProductList, setselectedProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);;
  const [chartData, setChartData] = useState({});
  const [reportStatus, setReportStatus] = useState("");

  const fetchData = async (apiName = "category", setter: null | { (value: React.SetStateAction<never[]>): void; (value: React.SetStateAction<never[]>): void; (arg0: any): void; }) => {
    try {
      let apiURL = `${BASE_URL}products/categories`;
      if (apiName === "product") {
        apiURL = `${BASE_URL}products/category/${selectedCategory.slug}`;
      } else if (apiName === "allProduct") {
        apiURL = `${BASE_URL}products?limit=0&select=title,price,category`;
      }
      let response = await getProductData({ apiURL, apiName });
      if (setter && response?.success) {
        setter(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData("category", setProductCategory);
    fetchData("allProduct", setAllProducts)
  }, []);

  useEffect(() => {
    if (Object.keys(selectedCategory).length) {
      fetchData("product", setProductList);
    }
  }, [selectedCategory]);

  useEffect(() => {
    let chartData: Array<any> = [];
    if (reportStatus === "") {
      let title = "";
      if (productList.length) {
        if (selectedProductList.length === 0) {
          chartData = preparePieChartData(productList, [], false);
          title = `All Products in Selected Category:  ${selectedCategory.name}`;
        } else {
          chartData = preparePieChartData(selectedProductList, [], false);
          title = `Selected Products in Category: ${selectedCategory.name}`;
        }
      } else if (productCategory.length) {
        chartData = preparePieChartData(productCategory, allProducts, true);
        title = `Products in All Categories`;
      }
      setChartData({ chartData, title });
    }
  }, [selectedProductList, productList, productCategory, allProducts]);

  const handleOnLoadAllData = () => {
    try {
      setChartData({ chartData: preparePieChartData(productCategory, allProducts, true), title: `Products in All Categories` });
    } catch (error) {

    }
  }

  const handleOnRunReport = () => {
    try {
      let data = selectedProductList.length ? selectedProductList : productList;
      let chartData = prepareBarChartData(data);
      setChartData({ ...chartData, title: "Products in Selected Category", yLabel: selectedCategory.name });
      setReportStatus("loading");
      setTimeout(() => {
        setReportStatus("success");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnRemoveFilter = () => {
    try {
      setProductList([]);
      setselectedProductList([]);
      setSelectedCategory({});
      setReportStatus("");
      setChartData({});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex" }}>
      <LeftContainer>
        <Menu productCategory={productCategory} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} productList={productList} setProductList={setProductList} selectedProductList={selectedProductList} setselectedProductList={setselectedProductList} handleOnRunReport={handleOnRunReport} reportStatus={reportStatus} setReportStatus={setReportStatus} setChartData={setChartData} onRemoveFilter={handleOnRemoveFilter} onLoadAllData={handleOnLoadAllData} />
      </LeftContainer>
      <RightContainer>
        <ChartWrapper>
          {
            reportStatus === "loading" || (Object.keys(chartData).length === 0) ? <Spinner /> : <Charts chartData={chartData} reportStatus={reportStatus} />
          }
        </ChartWrapper>
      </RightContainer>
    </div>

  )

}