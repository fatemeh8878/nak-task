import { useMutation, useQuery } from "@tanstack/react-query";
import { skuEndpoints } from "../endpoints/skus";
import { queryKeys } from "../../lib/queryKeys";
import type { Sku } from "../types";

export const useAddSku = () => {
  return useMutation<Sku, Error, Omit<Sku, "_id" | "id">>({
    mutationFn: skuEndpoints.createSku,
  });
};

export const useUpdateSku = () => {
  return useMutation<Sku, Error, { id: string; sku: Partial<Sku> }>({
    mutationFn: ({ id, sku }) => skuEndpoints.updateSku(id, sku),
  });
};

export const useSkuList = () => {
  return useQuery<Sku[], Error, Sku[]>({
    queryKey: queryKeys.skus.list(),
    queryFn: skuEndpoints.getSkus,
  });
};

export const useSkuDetail = (id?: string) => {
  return useQuery<Sku, Error, Sku>({
    queryKey: queryKeys.skus.detail(id || ""),
    queryFn: () => skuEndpoints.getSku(id || ""),
    enabled: !!id,
  });
};

