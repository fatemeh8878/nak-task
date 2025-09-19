import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addSku,
  getSkuDetail,
  getSkuList,
  updateSku,
  type Sku,
} from "../services/skuService";

export const useAddSku = () => {
  return useMutation<Sku, Error, Sku>({
    mutationFn: addSku,
  });
};

export const useUpdateSku = () => {
  return useMutation<Sku, Error, { id: string; sku: Sku }>({
    mutationFn: ({ id, sku }) => updateSku(id, sku),
  });
};

export const useSkuList = () => {
  return useQuery<Sku[], Error, Sku[]>({
    queryKey: ["skuList"],
    queryFn: getSkuList,
  });
};

export const useSkuDetail = (id?: string) => {
  return useQuery<Sku, Error, Sku>({
    queryKey: ["skuDetail", id],
    queryFn: () => getSkuDetail(id),
    enabled: !!id,
  });
};
