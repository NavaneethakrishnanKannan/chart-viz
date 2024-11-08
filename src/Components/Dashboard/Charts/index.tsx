import React from 'react';
import PieChart from './Pie.tsx';
import ColumnBarChart from './Bar.tsx';
import styled from 'styled-components';

const CHART_LOAD_STATUS = ["success", "updating"];

const ChartContainer = styled.div<{ isChartLoading: boolean }>`
display: flex;
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
text-transform: capitalize;
opacity: ${(props) => props.isChartLoading ? 0.5 : 1}
`;

interface ChartsProps {
    reportStatus: string;
  }

export default function Charts(props) {
    let isChartLoading = props.reportStatus === "loading";
    return (

        <ChartContainer isChartLoading = {isChartLoading} /*style={{ textTransform: "capitalize", ...isChartLoading ? { opacity: "0.5" } : { opacity: 1 } }}*/>
            {
                CHART_LOAD_STATUS.includes(props.reportStatus) ? <ColumnBarChart {...props} /> : <PieChart {...props} />
            }
        </ChartContainer>

    )

}
