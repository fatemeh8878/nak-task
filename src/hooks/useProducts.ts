import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  getProductList,
  updateProduct,
  type PaginationParams,
  type Product,
  type ProductResponse,
} from "../services/productService";

export const useProductList = (params?: PaginationParams) =>
  useQuery<ProductResponse, Error, ProductResponse>({
    queryKey: ["productList", params],
    queryFn: () => getProductList(params),
  });

export const useAddProduct = () => {
  return useMutation<Product, Error, Product, { onSuccess: () => void }>({
    mutationFn: addProduct,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, { id: string; product: Partial<Product> }>(
    {
      mutationFn: ({ id, product }) => updateProduct(id, product),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productList"] });
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productList"] });
    },
  });
};
