import { api } from "./api";

export interface Sku {
  _id?: string;
  model: string;
  price: string;
  numberInStock: string;
}

export const addSku = async (sku: Omit<Sku, "id">): Promise<Sku> => {
  const response = await api.post("/skus", sku);
  return response.data;
};

export const getSkuList = async (): Promise<Sku[]> => {
  const response = await api.get("/skus");
  return response.data;
};
