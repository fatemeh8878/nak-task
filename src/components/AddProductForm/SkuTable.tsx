import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { type Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { type ProductFormData } from "../../schemas/productSchema";
import { Button, Input, Table } from "../ui";
import { styles } from "./styles";
import { type SkuData } from "./types";

interface SkuTableProps {
  data: SkuData[];
  control: Control<ProductFormData>;
  onRemoveSku: (index: number) => void;
}

export const SkuTable = ({ data, control, onRemoveSku }: SkuTableProps) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [skuToDelete, setSkuToDelete] = useState<number | null>(null);
  const columnHelper = createColumnHelper<SkuData>();

  const handleDeleteClick = (index: number) => {
    setSkuToDelete(index);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (skuToDelete !== null) {
      onRemoveSku(skuToDelete);
      setShowModal(false);
      setSkuToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSkuToDelete(null);
  };
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "id",
        header: "",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("model", {
        header: t("model"),
      }),
      columnHelper.accessor("price", {
        header: t("price"),
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
        header: t("inStock"),
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
            onClick={() => handleDeleteClick(info.row.index)}
          >
            🗑️
          </span>
        ),
      }),
    ],
    [columnHelper, control]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table<SkuData>
        table={table}
        emptyMessage={t("addAttributesToGenerateSkus")}
        variant="rounded"
      />

      {showModal && (
        <div css={styles.modalOverlay}>
          <div css={styles.modalContent}>
            <p css={styles.modalText}>
              {t("deleteSkuConfirm", {
                model: data?.[skuToDelete || 0]?.model || "",
              })}
            </p>
            <div css={styles.modalButtons}>
              <Button
                variant="outlineError"
                onClick={handleCancelDelete}
                size="sm"
              >
                {t("cancel")}
              </Button>
              <Button variant="error" onClick={handleConfirmDelete} size="sm">
                {t("delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
