import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useFieldArray,
  useForm,
  useWatch,
  type Control,
  type UseFormSetValue,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, MultiSelectInput, SelectInput, Table } from "../components/ui";
import { Button } from "../components/ui/Button";
import { ControlledInput } from "../components/ui/ControlledInput";
import { useAttributeDetails, useAttributerList } from "../hooks";
import { useAddProduct } from "../hooks/useProducts";
import { productSchema, type ProductFormData } from "../schemas/productSchema";
import { addSku } from "../services/productService";
import { theme } from "../styles/theme";

const AttributeRow = ({
  attributeIndex,
  control,
  attributeOptions,
  onRemove,
  handleAddAttribute,
  setValue,
  isLast,
}: {
  attributeIndex: number;
  control: Control<ProductFormData>;
  attributeOptions: { label: string; value: string }[];
  onRemove: () => void;
  handleAddAttribute: () => void;
  isLast: boolean;
  setValue: UseFormSetValue<ProductFormData>;
}) => {
  const selectedAttributeId = useWatch({
    control,
    name: `attributes.${attributeIndex}.name`,
  });

  useEffect(() => {
    if (selectedAttributeId) {
      setValue(`attributes.${attributeIndex}.values`, []);
    }
  }, [selectedAttributeId, setValue]);

  const { data: attributeDetails } = useAttributeDetails(
    selectedAttributeId || ""
  );

  const attributeOptionsDetails = useMemo(() => {
    if (!attributeDetails?.values || !Array.isArray(attributeDetails.values)) {
      return [];
    }
    return attributeDetails.values.map((val: string) => ({
      label: val,
      value: val,
    }));
  }, [attributeDetails?.values]);

  const attributeRowStyles = css`
    display: flex;
    align-items: center;
    gap: 24px;
  `;

  const attributeDropdownStyles = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    flex: 1;
  `;

  const deleteIconStyles = css`
    color: ${theme.colors.error[500]};
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      color: ${theme.colors.error[600]};
    }
  `;

  const attributeNameStyles = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    width: 100%;
  `;

  return (
    <div css={attributeRowStyles}>
      <div css={attributeNameStyles}>
        <label>Attribute Name</label>
        <div css={attributeDropdownStyles}>
          <SelectInput
            options={attributeOptions || []}
            name={`attributes.${attributeIndex}.name`}
            control={control}
            fullWidth
            placeholder="Attribute"
            variant={isLast ? "default" : "rounded"}
          />
        </div>
      </div>
      <div css={attributeNameStyles}>
        <label>Attribute Values</label>
        <MultiSelectInput
          name={`attributes.${attributeIndex}.values`}
          control={control}
          disabled={attributeOptionsDetails.length === 0}
          placeholder="Values"
          variant={isLast ? "default" : "rounded"}
          fullWidth
          options={attributeOptionsDetails}
        />
      </div>
      {isLast && (
        <Button type="button" variant="white" onClick={handleAddAttribute}>
          Add
        </Button>
      )}
      {!isLast && (
        <Button
          type="button"
          variant="iconButton"
          css={deleteIconStyles}
          onClick={onRemove}
        >
          شسی
        </Button>
      )}
    </div>
  );
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addProduct } = useAddProduct();

  const { control, handleSubmit, watch, setValue } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      skusIds: [],
      attributes: [{ name: "", values: [] }],
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

  // Watch form values to generate SKUs
  const watchedAttributes = watch("attributes");

  // Generate SKUs based on attribute combinations
  const generatedSKUs = useMemo(() => {
    const validAttributes = watchedAttributes.filter(
      (attr) => attr.name && attr.values && attr.values.length > 0
    );

    if (validAttributes.length === 0) return [];

    const values = validAttributes.map((attr) => attr.values);

    // Generate all combinations
    const combinations = values.reduce(
      (acc: string[][], curr: string[]) => {
        const result: string[][] = [];
        for (const a of acc) {
          for (const c of curr) {
            result.push([...a, c]);
          }
        }
        return result;
      },
      [[]]
    );

    return combinations.map((combo) => ({
      model: combo.join(" / "),
      price: "2000", // Default price
      numberInStock: "100", // Default stock
    }));
  }, [watchedAttributes]);

  // Update data state when generatedSKUs change
  useEffect(() => {
    setData(generatedSKUs);
  }, [generatedSKUs]);

  const deleteIconStyles = css`
    color: ${theme.colors.error[500]};
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      color: ${theme.colors.error[600]};
    }
  `;

  const [data, setData] = useState<
    {
      model: string;
      price: string;
      numberInStock: string;
    }[]
  >([]);

  const handleRemoveSKU = useCallback((index: number) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  const handleSkuFocus = useCallback(
    async (index: number) => {
      if (index > 0) {
        // Send request to backend when focusing on second row or later
        try {
          const skuData = data[index];
          if (skuData) {
            await addSku({
              model: skuData.model,
              price: skuData.price,
              numberInStock: skuData.numberInStock,
            });
            console.log(`SKU ${index} sent to backend`);
          }
        } catch (error) {
          console.error("Error sending SKU to backend:", error);
        }
      }
    },
    [data]
  );

  // Table configuration
  const columnHelper = createColumnHelper<(typeof generatedSKUs)[0]>();
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "id",
        header: "",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("model", {
        header: "Model",
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => (
          <Input
            name={`skus.${info.row.index}.price`}
            control={control}
            type="number"
            fullWidth
            onFocus={() => handleSkuFocus(info.row.index)}
          />
        ),
      }),
      columnHelper.accessor("numberInStock", {
        header: "In Stock",
        cell: (info) => (
          <Input
            name={`skus.${info.row.index}.numberInStock`}
            control={control}
            type="number"
            fullWidth
            onFocus={() => handleSkuFocus(info.row.index)}
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: (info) => (
          <span
            css={deleteIconStyles}
            onClick={() => handleRemoveSKU(info.row.index)}
          >
            🗑️
          </span>
        ),
      }),
    ],
    [columnHelper, deleteIconStyles, handleRemoveSKU, handleSkuFocus]
  );
  const skuTable = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = (formData: ProductFormData) => {
    setIsSubmitting(true);
    const productData = {
      name: formData.name,
      skusIds: data.map((sku) => sku.model),
      attributes: formData.attributes.map((attr) => ({
        name: attr.name,
        values: attr.values || [],
      })),
    };

    addProduct(productData, {
      onSuccess: () => {
        navigate("/products");
      },
    });
    setIsSubmitting(false);
  };

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

  const containerStyles = css`
    padding: 70px 100px;
    max-width: 1288px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  const titleStyles = css`
    font-size: ${theme.typography.fontSize["2xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xl};
  `;

  const formGroupStyles = css`
    margin-bottom: ${theme.spacing.lg};
  `;

  const labelStyles = css`
    display: block;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xs};
  `;

  const buttonGroupStyles = css`
    display: flex;
    justify-content: space-between;
  `;

  const formStyles = css`
    display: flex;
    gap: ${theme.spacing.lg};
    flex-direction: column;
    height: 100%;
    flex: 1;
  `;

  const formContainerStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  `;

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} css={formContainerStyles}>
        <div css={formStyles}>
          {/* Product Name */}
          <div css={formGroupStyles}>
            <ControlledInput
              name="name"
              control={control}
              label="Name"
              variant="rounded"
            />
          </div>

          {/* Attributes Section */}
          <div css={formGroupStyles}>
            {attributeFields.map((field, attributeIndex) => (
              <AttributeRow
                handleAddAttribute={handleAddAttribute}
                key={field.id}
                attributeIndex={attributeIndex}
                control={control}
                attributeOptions={attributeOptions || []}
                onRemove={() => handleRemoveAttribute(attributeIndex)}
                isLast={attributeIndex === attributeFields.length - 1}
                setValue={setValue}
              />
            ))}
          </div>

          {/* SKUs Table */}
          <div css={formGroupStyles}>
            <label css={labelStyles}>SKUs</label>
            <Table
              table={skuTable}
              emptyMessage="Add attributes to generate SKUs"
              variant="rounded"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div css={buttonGroupStyles}>
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

export default AddProduct;
