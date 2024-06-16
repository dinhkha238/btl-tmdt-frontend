import { apiClient, filterEmptyString } from "@/utils/api";

//get
export const getProductItems = async (select: any) => {
  const result = await apiClient.get(`/get-product-items`, {
    params: filterEmptyString(select),
  });
  return result.data;
};

export const getProductById = async (data: any) => {
  const result = await apiClient.get(`/get-product-item/${data.id}`);
  return result.data;
};

export const getFeedbackByIdProduct = async (data: any) => {
  const result = await apiClient.get(`/feedback-by-id-product/${data.id}`);
  return result.data;
};

export const addFeedback = async (data: any) => {
  const result = await apiClient.post(`/add-feedback`, data);
  return result.data;
};

export const getStatisticProductItems = async (data: any) => {
  const result = await apiClient.get(`/statistic-product-item`, {
    params: filterEmptyString(data),
  });
  return result.data;
};
export const getMonthRevenue = async (data: any) => {
  const result = await apiClient.get(`/month-revenue`, {
    params: filterEmptyString(data),
  });
  return result.data;
};
export const getUserSpendInfo = async (data: any) => {
  const result = await apiClient.get(`/user-spending-info`, {
    params: filterEmptyString(data),
  });
  return result.data;
};
