import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { type Control } from "react-hook-form";
import { type ProductFormData } from "../../schemas/productSchema";
import { Input, Table } from "../ui";
import { styles } from "./styles";
import { type SkuData } from "./types";

interface SkuTableProps {
  data: SkuData[];
  control: Control<ProductFormData>;
  onRemoveSku: (index: number) => void;
}

export const SkuTable = ({ data, control, onRemoveSku }: SkuTableProps) => {
  const columnHelper = createColumnHelper<SkuData>();
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
          />
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: (info) => (
          <span
            css={styles.deleteIcon}
            onClick={() => onRemoveSku(info.row.index)}
          >
            🗑️
          </span>
        ),
      }),
    ],
    [columnHelper, control, onRemoveSku]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table<SkuData>
      table={table}
      emptyMessage="Add attributes to generate SKUs"
      variant="rounded"
    />
  );
};
