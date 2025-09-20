import { css } from "@emotion/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDeleteProduct, useProductList } from "../api/hooks/useProducts";
import { type Product } from "../api/types";
import { Button, Modal, Pagination } from "../components/ui";
import { EditIcon, TrashIcon } from "../components/ui/icons";
import { Table } from "../components/ui/Table";
import { theme } from "../styles/theme";

const columnHelper = createColumnHelper<Product>();

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data: productResponse } = useProductList({
    perPage,
    page: currentPage,
  });

  const { mutate, isPending } = useDeleteProduct();

  const paginationMeta = productResponse?.meta;

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "id",
        header: "",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("name", {
        header: t("name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: "countOfSkus",
        header: "Count of SKUs",
        cell: (info) => info.row.original.skus?.length || 0,
      }),
      columnHelper.display({
        id: "action",
        header: "",
        cell: (info) => (
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/products/${info.row.original._id}/edit`)
              }
            >
              <EditIcon width={16} height={16} color="gray" />
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteClick(info.row.original)}
            >
              <TrashIcon width={16} height={16} color="gray" />
            </div>
          </div>
        ),
      }),
    ],
    [t, navigate]
  );

  const table = useReactTable({
    data: productResponse?.items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    mutate(productToDelete?._id as string, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
      },
    });
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const containerStyles = css`
    padding: ${theme.spacing.xl};
    max-width: 1288px;
    margin: 0 auto;
  `;

  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.lg};
  `;

  const titleStyles = css`
    font-size: ${theme.typography.fontSize["2xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.black};
  `;

  const tableContainerStyles = css`
    border-radius: 40px;
    width: 100%;
    border: 1px solid #ffffff;
    overflow: hidden;
  `;

  return (
    <div css={containerStyles}>
      <div css={headerStyles}>
        <h1 css={titleStyles}>{t("products")}</h1>
        <Button onClick={handleAddProduct} variant="black">
          {t("addProduct")} +
        </Button>
      </div>

      <div css={tableContainerStyles}>
        <Table<Product>
          table={table}
          emptyMessage="No products found"
          variant="rounded"
        />
      </div>

      {paginationMeta && (
        <Pagination
          currentPage={paginationMeta.page}
          totalPages={paginationMeta.totalPages}
          onPageChange={handlePageChange}
          totalItems={paginationMeta.total}
          perPage={paginationMeta.perPage}
        />
      )}

      <Modal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        confirmText={t("yes")}
        cancelText={t("no")}
        isLoading={isPending}
      >
        {t("deleteProductConfirm", { name: productToDelete?.name })}
      </Modal>
    </div>
  );
};

export default Products;
