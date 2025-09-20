import { apiClient } from "../client";
import type { PaginatedResponse, PaginationParams, Product } from "../types";

export const productEndpoints = {
  // Get products list with pagination
  getProducts: async (
    params?: PaginationParams
  ): Promise<PaginatedResponse<Product>> => {
    const response = await apiClient.get("/products", { params });
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (
    product: Omit<Product, "id" | "_id">
  ): Promise<Product> => {
    const response = await apiClient.post("/products", product);
    return response.data;
  },

  // Update existing product
  updateProduct: async (
    id: string,
    product: Partial<Product>
  ): Promise<Product> => {
    const response = await apiClient.patch(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
