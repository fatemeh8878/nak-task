import { useMutation, useQuery } from "@tanstack/react-query";
import { addSku, getSkuList, type Sku } from "../services/skuService";

export const useAddSku = () => {
  return useMutation<Sku, Error, Sku>({
    mutationFn: addSku,
  });
};

export const useSkuList = () => {
  return useQuery<Sku[], Error, Sku[]>({
    queryKey: ["skuList"],
    queryFn: getSkuList,
  });
};
