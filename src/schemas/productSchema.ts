import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name can only contain letters, numbers, and spaces"
    ),

  skusIds: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "SKU ID is required")
          .min(1, "SKU ID must be at least 1 character")
          .max(50, "SKU ID must be less than 50 characters")
          .regex(
            /^[a-zA-Z0-9_-]+$/,
            "SKU ID can only contain letters, numbers, underscores, and hyphens"
          ),
      })
    )
    .min(0, "SKU IDs are generated automatically")
    .max(10, "Maximum 10 SKU IDs allowed"),

  attributes: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "Attribute name is required")
          .min(2, "Attribute name must be at least 2 characters")
          .max(50, "Attribute name must be less than 50 characters")
          .regex(
            /^[a-zA-Z0-9\s]+$/,
            "Attribute name can only contain letters, numbers, and spaces"
          ),
        values: z
          .array(z.string())
          .min(1, "At least one attribute value is required")
          .max(10, "Maximum 10 attribute values allowed"),
      })
    )
    .min(1, "At least one attribute is required")
    .max(20, "Maximum 20 attributes allowed"),
    
});

export type ProductFormData = z.infer<typeof productSchema>;
