import { apiClient, filterEmptyString } from "@/utils/api";

//get
export const getCustomers = async () => {
    const result = await apiClient.get("/");
    return result.data;
}
export const getProducts = async (select:any) => {
    const result = await apiClient.get(`/get-products/${select.option}`,{
        params: filterEmptyString(select),
    });
    return result.data;
}
export const getCustomer = async () => {
    const result = await apiClient.get("/get-customer");
    return result.data;
}
export const getOrders = async (time:any) => {
    const result = await apiClient.get("/get-orders",{
        params: filterEmptyString(time),
    });
    return result.data;
}
export const getOrdersById = async () => {
    const result = await apiClient.get("/get-orders-by-id");
    return result.data;
}


//post
export const checkLogin = async (data:any) => {
    const result = await apiClient.post("/login",data);
    return result.data;
}
export const addCustomer = async (data:any) => {
    const result = await apiClient.post("/create-customer",data);
    return result.data;
}
export const addProduct = async (data:any) => {
    const result = await apiClient.post("/create-product",data);
    return result.data;
}
export const createOrder = async (data:any) => {
    const result = await apiClient.post("/create-order",data);
    return result.data;
}

// put
export const addToCart = async (id:any) => {
    const result = await apiClient.put(`/add-to-cart/${id}`,id);
    return result.data;
}
export const decreaseProduct = async (id:any) => {
    const result = await apiClient.put(`/decrease-product/${id}`,id);
    return result.data;
}
export const updateProduct = async (data:any) => {
    const result = await apiClient.put(`/update-product/${data._id}`,data);
    return result.data;
}
export const updateCustomer = async (data:any) => {
    const result = await apiClient.put(`/update-customer/${data._id}`,data);
    return result.data;
}
    

// delete
export const deleteToCart = async (id:any) => {
    const result = await apiClient.delete(`/delete-cart/${id}`);
    return result.data;
}
export const deleteAllCart = async () => {
    const result = await apiClient.delete(`/delete-all-cart`);
    return result.data;
}
export const deleteProduct = async (id:any) => {
    const result = await apiClient.delete(`/delete-product/${id}`);
    return result.data;
}
export const deleteCustomer = async (id:any) => {
    const result = await apiClient.delete(`/delete-customer/${id}`);
    return result.data;
}
export const deleteOrder = async (id:any) => {
    const result = await apiClient.delete(`/delete-order/${id}`);
    return result.data;
}

