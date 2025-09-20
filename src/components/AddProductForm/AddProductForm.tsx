import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAddProduct, useAddSku, useAttributerList } from "../../api/hooks";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [skuData, setSkuData] = useState<SkuData[]>([]);
  const { mutate: addProduct, isPending } = useAddProduct();
  const { mutateAsync: addSku, isPending: isSkuPending } = useAddSku();
  const { control, handleSubmit, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      attributes: [{ name: "", values: [] }],
      skus: [],
      skusIds: undefined,
    },
  });

  const { data: attributeList } = useAttributerList();
  const watchedAttributes = watch("attributes");

  const attributeOptions = useMemo(() => {
    if (!attributeList || !Array.isArray(attributeList)) {
      return [];
    }

    // Get currently selected attribute names
    const selectedAttributeNames = watchedAttributes
      .filter((attr) => attr.name && attr.name.trim() !== "")
      .map((attr) => attr.name);

    return attributeList
      .filter((attr) => !selectedAttributeNames.includes(attr.name))
      .map((attr) => ({
        label: attr.name,
        value: attr._id || attr.name,
      }));
  }, [attributeList, watchedAttributes]);

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const generatedSKUs = useSkuGeneration(watchedAttributes);

  useEffect(() => {
    setSkuData(generatedSKUs);
    setValue("skus", [...(generatedSKUs || [])]);
  }, [generatedSKUs, setValue]);

  const handleRemoveSku = useCallback(
    (index: number) => {
      setSkuData((prevData) => {
        const filtered = prevData.filter((_, i) => i !== index);
        setValue("skus", [...filtered, ...(generatedSKUs || [])]);
        return filtered;
      });
    },
    [generatedSKUs, setValue]
  );

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
    const createdSkuIds: string[] = [];

    for (const sku of generatedSKUs) {
      if (sku.price && sku.numberInStock) {
        const createdSku = await addSku({
          model: sku.model,
          price: sku.price,
          numberInStock: sku.numberInStock,
        });
        createdSkuIds.push(createdSku._id || "");
      }
    }

    addProduct(
      {
        name: formData.name,
        skusIds: createdSkuIds.map((id) => id),

        attributes: formData.attributes
          .filter((attr) => attr.name && attr.name.trim() !== "")
          .map((attr) => ({
            name: attr.name,
            values: attr.values || [],
          })),
      },
      {
        onSuccess: () => {
          navigate("/products");
        },
      }
    );
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
              label={t("name")}
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
                allAttributes={watchedAttributes}
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
            disabled={isPending || isSkuPending}
            loading={isPending || isSkuPending}
            size="md"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
