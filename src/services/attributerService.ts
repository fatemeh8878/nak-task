import { api } from "./api";

// Auth API types
export interface AttributerResponse {
  data: Attribute[];
}

export interface Attribute extends Record<string, unknown> {
  _id?: string;
  name: string;
  values: string[];
}

export const getAttributerList = async (): Promise<AttributerResponse> => {
  const response = await api.get("/attributes");
  return response.data;
};

export const addAttribute = async (
  attribute: Omit<Attribute, "_id">
): Promise<Attribute> => {
  const response = await api.post("/attributes", attribute);
  return response.data;
};

export const getAttributeDetails = async (id: string): Promise<Attribute> => {
  const response = await api.get(`/attributes/${id}`);
  return response.data;
};
