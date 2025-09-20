import { apiClient } from "../client";
import type { Attribute } from "../types";

export const attributeEndpoints = {
  // Get all attributes
  getAttributes: async (): Promise<Attribute[]> => {
    const response = await apiClient.get("/attributes");
    return response.data.data || response.data;
  },

  // Get single attribute by ID
  getAttribute: async (id: string): Promise<Attribute> => {
    const response = await apiClient.get(`/attributes/${id}`);
    return response.data;
  },

  // Create new attribute
  createAttribute: async (
    attribute: Omit<Attribute, "_id" | "id">
  ): Promise<Attribute> => {
    const response = await apiClient.post("/attributes", attribute);
    return response.data;
  },

  // Update existing attribute
  updateAttribute: async (
    id: string,
    attribute: Partial<Attribute>
  ): Promise<Attribute> => {
    const response = await apiClient.patch(`/attributes/${id}`, attribute);
    return response.data;
  },

  // Delete attribute
  deleteAttribute: async (id: string): Promise<void> => {
    await apiClient.delete(`/attributes/${id}`);
  },
};
