export const preparePieChartData = (data: Array<any> = [], productData: Array<any> = [], loadCategory: boolean = false): Array<any> => {
    try {
        let chartData: Array<any> = [];
        if (loadCategory) {
            const allProductData = productData.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {});
            chartData = Object.entries(allProductData).map(([name, count]) => ({
                name,
                y: count,
            }));
        } else {
            chartData = data.map((v) => {
                return { name: v.title, y: v.price };
            });
        }
        return chartData;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const prepareBarChartData = (data: Array<any> = []): { category: Array<any>; chartData: Array<any> } => {
    try {
        console.log(data)
        let category = [];
        let chartData = [];
        data.forEach(v => {
            category.push(v.title);
            if(chartData.length && chartData[0]["data"].length) {
                chartData[0]["data"].push(v.price);
            } else {
                chartData.push({ name: "Product Data", data: [v.price] })
            }
        });
        return { category, chartData }
    } catch (error) {
        console.log(error);
        return { category: [], chartData: [] };

    }
}
//         series: [{
//     name: 'Jane',
//     data: [1, 0, 4]
// }, {
//     name: 'John',
//     data: [5, 7, 3]
// }]