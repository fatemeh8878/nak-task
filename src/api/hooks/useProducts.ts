import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productEndpoints } from "../endpoints/products";
import { queryKeys } from "../../lib/queryKeys";
import type { PaginatedResponse, PaginationParams, Product } from "../types";

export const useProductList = (params?: PaginationParams) =>
  useQuery<PaginatedResponse<Product>, Error, PaginatedResponse<Product>>({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productEndpoints.getProducts(params),
  });

export const useProductDetail = (id: string) => {
  return useQuery<Product, Error, Product>({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productEndpoints.getProduct(id),
    enabled: !!id,
  });
};

export const useAddProduct = () => {
  return useMutation<Product, Error, Omit<Product, "id" | "_id">>({
    mutationFn: productEndpoints.createProduct,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: string; product: Partial<Product> }>({
    mutationFn: ({ id, product }) => productEndpoints.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: productEndpoints.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.lists() });
    },
  });
};

