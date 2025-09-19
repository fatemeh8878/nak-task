import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAttributerList } from "../../hooks";
import { useProductDetail, useUpdateProduct } from "../../hooks/useProducts";
import { useAddSku, useSkuDetail } from "../../hooks/useSku";
import {
  productSchema,
  type ProductFormData,
} from "../../schemas/productSchema";
import { AttributeRow } from "../AddProductForm/AttributeRow";
import { SkuTable } from "../AddProductForm/SkuTable";
import { useSkuGeneration } from "../AddProductForm/hooks";
import { styles } from "../AddProductForm/styles";
import { type SkuData } from "../AddProductForm/types";
import { Button } from "../ui/Button";
import { ControlledInput } from "../ui/ControlledInput";

export const EditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [skuData, setSkuData] = useState<SkuData[]>([]);
  const { mutate: updateProduct, isPending } = useUpdateProduct();
  const { mutateAsync: addSku, isPending: isSkuPending } = useAddSku();
  const { data: productDetail, isLoading: isLoadingProduct } = useProductDetail(
    id || ""
  );
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<ProductFormData>({
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
  const [skuId, setSkuId] = useState<string | undefined>(undefined);
  const { data } = useSkuDetail(skuId);
  const generatedSKUs = useSkuGeneration(watchedAttributes);

  useEffect(() => {
    if (generatedSKUs) {
      setSkuData((prev) => {
        const newSkus = generatedSKUs.map((sku) => ({
          model: sku.model,
          price: prev.find((p) => p.model === sku.model)?.price || "",
          numberInStock:
            prev.find((p) => p.model === sku.model)?.numberInStock || "",
        }));
        setValue("skus", [...(newSkus || [])]);
        return newSkus;
      });
    }
  }, [generatedSKUs, setValue]);

  useEffect(() => {
    if (productDetail) {
      const attributes =
        productDetail.attributes && productDetail.attributes.length > 0
          ? productDetail.attributes.map((attr) => ({
              name: attr.name,
              values: attr.values,
            }))
          : [{ name: "", values: [] }];

      productDetail.skus?.forEach((skuId: string) => {
        setSkuId(skuId);
      });

      const skus = data
        ? [
            {
              model: data.model,
              price: data.price,
              numberInStock: data.numberInStock,
            },
          ]
        : [];

      reset({
        name: productDetail.name || "",
        attributes: [...attributes, { name: "", values: [] }],
        skus,
        skusIds: productDetail.skusIds,
      });

      if (skus.length > 0) {
        setSkuData(skus);
      }
    }
  }, [productDetail, data, reset]);

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
    const skuIds = productDetail?.skusIds || [];

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

    updateProduct(
      {
        id: id || "",
        product: {
          name: formData.name,
          skusIds: skuIds,
          attributes: formData.attributes
            .filter((attr) => attr.name && attr.name.trim() !== "")
            .map((attr) => ({
              name: attr.name,
              values: attr.values || [],
            })),
        },
      },
      {
        onSuccess: () => {
          navigate("/products");
        },
      }
    );
  });

  if (isLoadingProduct) {
    return (
      <div css={styles.container}>
        <h1 css={styles.title}>Edit Product</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>Edit Product</h1>
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};
