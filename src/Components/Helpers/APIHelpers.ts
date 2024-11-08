import axios from 'axios';
export const getProductData = async (params: { apiURL: string; apiName: string }) => {
    try {
        const { apiURL, apiName } = params;
        return await axios.get(apiURL).then(response => {
            return { success: true, data: apiName === "category" ? response.data : response.data.products };
        }).catch(error => {
            return { success: false, error, data: [] };
        })
    } catch (error) {
        console.log(error);
        return { success: false, error, data: [] };
    }
}