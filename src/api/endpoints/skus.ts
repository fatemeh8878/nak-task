import { apiClient } from "../client";
import type { Sku } from "../types";

export const skuEndpoints = {
  // Get all SKUs
  getSkus: async (): Promise<Sku[]> => {
    const response = await apiClient.get("/skus");
    return response.data;
  },

  // Get single SKU by ID
  getSku: async (id: string): Promise<Sku> => {
    const response = await apiClient.get(`/skus/${id}`);
    return response.data;
  },

  // Create new SKU
  createSku: async (sku: Omit<Sku, "_id" | "id">): Promise<Sku> => {
    const response = await apiClient.post("/skus", sku);
    return response.data;
  },

  // Update existing SKU
  updateSku: async (id: string, sku: Partial<Sku>): Promise<Sku> => {
    const response = await apiClient.patch(`/skus/${id}`, sku);
    return response.data;
  },

  // Delete SKU
  deleteSku: async (id: string): Promise<void> => {
    await apiClient.delete(`/skus/${id}`);
  },
};

