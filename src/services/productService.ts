import { api } from "./api";

// Product API types
export interface PaginationParams {
  page?: number;
  perPage?: number;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ProductResponse {
  data: Product[];
  meta: PaginationMeta;
}

export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface Product extends Record<string, unknown> {
  name: string;
  skusIds: string[];
  attributes: ProductAttribute[];
}

export const getProductList = async (
  params?: PaginationParams
): Promise<ProductResponse> => {
  const response = await api.get("/products", { params });
  return response.data;
};

export const addProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const productResponse = await api.post("/products", {
    name: product.name,
    attributes: product.attributes,
  });

  return productResponse.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
