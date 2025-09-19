import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAttributerList } from "../../hooks";
import { useAddProduct } from "../../hooks/useProducts";
import { useAddSku, useSkuList } from "../../hooks/useSku";
import {
  productSchema,
  type ProductFormData,
} from "../../schemas/productSchema";
import { Button } from "../ui/Button";
import { ControlledInput } from "../ui/ControlledInput";
import { AttributeRow } from "./AttributeRow";
import { SkuTable } from "./SkuTable";
import { useSkuGeneration } from "./hooks";
import { styles } from "./styles";
import { type SkuData } from "./types";

export const AddProductForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skuData, setSkuData] = useState<SkuData[]>([]);
  const { mutate: addProduct } = useAddProduct();
  const { mutateAsync: addSku } = useAddSku();
  const { data: skuList } = useSkuList();
  console.log("SKU List:", skuList);
  const { control, handleSubmit, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      attributes: [{ name: "", values: [] }],
      skus: [],
    },
  });

  const { data: attributeList } = useAttributerList();
  const attributeOptions = useMemo(() => {
    if (!attributeList || !Array.isArray(attributeList)) {
      return [];
    }
    return attributeList.map((attr) => ({
      label: attr.name,
      value: attr._id || attr.name,
    }));
  }, [attributeList]);

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const watchedAttributes = watch("attributes");
  const generatedSKUs = useSkuGeneration(watchedAttributes);

  useEffect(() => {
    setSkuData(generatedSKUs);
    setValue("skus", generatedSKUs);
  }, [generatedSKUs, setValue]);

  const handleRemoveSku = useCallback((index: number) => {
    setSkuData((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  const handleAddAttribute = useCallback(() => {
    appendAttribute({ name: "", values: [] });
  }, [appendAttribute]);

  const handleRemoveAttribute = useCallback(
    (index: number) => {
      if (attributeFields.length > 1) {
        removeAttribute(index);
      }
    },
    [attributeFields.length, removeAttribute]
  );

  const onSubmit = handleSubmit(async (formData) => {
    setIsSubmitting(true);
    const skuIds: string[] = [];

    for (const sku of formData.skus) {
      if (sku.price && sku.numberInStock) {
        const createdSku = await addSku({
          model: sku.model,
          price: sku.price,
          numberInStock: sku.numberInStock,
        });
        skuIds.push(createdSku._id || "");
      }
    }

    addProduct({
      name: formData.name,
      skusIds: skuIds,
      attributes: formData.attributes.map((attr) => ({
        name: attr.name,
        values: attr.values || [],
      })),
    });
  });

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>Product</h1>
      <form onSubmit={onSubmit} css={styles.formContainer}>
        <div css={styles.formContent}>
          <div css={styles.formGroup}>
            <ControlledInput
              name="name"
              control={control}
              label="Name"
              variant="rounded"
            />
          </div>

          <div css={styles.formGroup}>
            {attributeFields.map((field, attributeIndex) => (
              <AttributeRow
                key={field.id}
                attributeIndex={attributeIndex}
                control={control}
                attributeOptions={attributeOptions || []}
                onRemove={() => handleRemoveAttribute(attributeIndex)}
                isLast={attributeIndex === attributeFields.length - 1}
                handleAddAttribute={handleAddAttribute}
                setValue={setValue}
              />
            ))}
          </div>

          <div css={styles.formGroup}>
            <label css={styles.label}>SKUs</label>
            <SkuTable
              data={skuData}
              control={control}
              onRemoveSku={handleRemoveSku}
            />
          </div>
        </div>

        <div css={styles.buttonGroup}>
          <Button
            type="button"
            variant="white"
            onClick={() => navigate("/products")}
            size="md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="black"
            disabled={isSubmitting}
            loading={isSubmitting}
            size="md"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
