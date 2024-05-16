import { getProductItems } from "@/services/product.service";
import { useQuery } from "react-query";

const CACHE_KEYS = {
    InforProductItems: "INFOR_PRODUCT_ITEMS",
}
// query
export const useProductItems =  (select:any) => {
    return useQuery([CACHE_KEYS.InforProductItems,select], () => getProductItems(select));
  }
  