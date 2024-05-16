import { apiClient, filterEmptyString } from "@/utils/api";

//get
export const getProductItems = async (select:any) => {
    const result = await apiClient.get(`/get-product-items`,{
        params: filterEmptyString(select),
    });
    return result.data;
}