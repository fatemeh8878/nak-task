import { type Control, type UseFormSetValue } from "react-hook-form";
import { type ProductFormData } from "../../schemas/productSchema";

export interface SkuData extends Record<string, unknown> {
  model: string;
  price: string;
  numberInStock: string;
}

export interface AttributeRowProps {
  attributeIndex: number;
  control: Control<ProductFormData>;
  attributeOptions: { label: string; value: string }[];
  onRemove: () => void;
  handleAddAttribute: () => void;
  isLast: boolean;
  setValue: UseFormSetValue<ProductFormData>;
}
