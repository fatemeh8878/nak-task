import { z } from "zod";

export const attributeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      "Name can only contain letters, numbers, and spaces"
    ),

  values: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "Value is required")
          .min(1, "Value must be at least 1 character")
          .max(100, "Value must be less than 100 characters")
          .regex(
            /^[a-zA-Z0-9\s,.-]+$/,
            "Value can only contain letters, numbers, spaces, commas, dots, and hyphens"
          ),
      })
    )
    .min(1, "At least one value is required")
    .max(10, "Maximum 10 values allowed"),
});

export type AttributeFormData = z.infer<typeof attributeSchema>;
