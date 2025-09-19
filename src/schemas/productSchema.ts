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

  skusIds: z.optional(z.array(z.string())),

  attributes: z
    .array(
      z.object({
        name: z
          .string()
          .min(0, "Attribute name is optional")
          .max(50, "Attribute name must be less than 50 characters")
          .regex(
            /^[a-zA-Z0-9\s]*$/,
            "Attribute name can only contain letters, numbers, and spaces"
          ),
        values: z
          .array(z.string())
          .min(0, "Attribute values are optional")
          .max(10, "Maximum 10 attribute values allowed"),
      })
    )
    .min(0, "Attributes are optional")
    .max(20, "Maximum 20 attributes allowed"),
  skus: z
    .array(
      z.object({
        model: z.string().min(1, "Model is required"),
        price: z.string().min(1, "Price is required"),
        numberInStock: z.string().min(1, "Stock is required"),
      })
    )
    .min(1, "At least one SKU is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;
