import {
  addFeedback,
  getFeedbackByIdProduct,
  getMonthRevenue,
  getProductById,
  getProductItems,
  getStatisticProductItems,
  getUserSpendInfo,
} from "@/services/product.service";
import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";

const CACHE_KEYS = {
  InforProductItems: "INFOR_PRODUCT_ITEMS",
  InforProductItem: "INFOR_PRODUCT_ITEM",
  InforFeedbackByIdProduct: "INFOR_FEEDBACK_BY_ID_PRODUCT",
  InforSpendInfo: "INFOR_SPEND_INFO",
};
// query
export const useProductItems = (select: any) => {
  return useQuery([CACHE_KEYS.InforProductItems, select], () =>
    getProductItems(select)
  );
};
export const useProductItemById = (data: any) => {
  return useQuery([CACHE_KEYS.InforProductItem, data], () =>
    getProductById(data)
  );
};
export const useFeedbackByIdProduct = (data: any) => {
  return useQuery([CACHE_KEYS.InforFeedbackByIdProduct, data], () =>
    getFeedbackByIdProduct(data)
  );
};
export const useStatisticProductItems = (data: any) => {
  return useQuery([CACHE_KEYS.InforProductItems, data], () =>
    getStatisticProductItems(data)
  );
};
export const useMonthRevenue = (data: any) => {
  return useQuery([CACHE_KEYS.InforProductItems, data], () =>
    getMonthRevenue(data)
  );
};
export const useUserSpendInfo = (data: any) => {
  return useQuery([CACHE_KEYS.InforSpendInfo, data], () =>
    getUserSpendInfo(data)
  );
};

// mutation
export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: any) => {
      return addFeedback(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(CACHE_KEYS.InforFeedbackByIdProduct);
        message.success("Add feedback success");
      },
      onError: () => {
        message.error("Add feedback failed");
      },
    }
  );
};
