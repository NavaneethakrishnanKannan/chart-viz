import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ColumnChart = (props) => {
    const { chartData, category, title, yLabel } = props.chartData;
    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: title,
            align: "left"
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: category ? category : [],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                },
                step: 1
            },
            tickInterval: 1
        },
        yAxis: {
            title: {
                text: yLabel
            }
        },
        series: chartData ? chartData : []
    };
    console.log(options, category, chartData)
    return <HighchartsReact highcharts={Highcharts} options={options} />
};

export default ColumnChart;
