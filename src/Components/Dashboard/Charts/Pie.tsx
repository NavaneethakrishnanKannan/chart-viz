import React, { Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Spinner from '../Menu/Common-Components/Spinner.tsx';

const PieChart = (props) => {
    const { chartData, title } = props.chartData;
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: title,
            align: "left"
        },
        series: [{
            name: 'Share',
            data: chartData ? chartData : [],
        }]
    };

    return (
       <Fragment>
        {
            chartData.length ? <HighchartsReact highcharts={Highcharts} options={options} /> : <Spinner />
        }
           
       </Fragment> 
    )
};

export default PieChart;