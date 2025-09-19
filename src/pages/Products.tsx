import { css } from "@emotion/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Pagination } from "../components/ui";
import { Table } from "../components/ui/Table";
import { useProductList } from "../hooks/useProducts";
import { type Product } from "../services/productService";
import { theme } from "../styles/theme";

const columnHelper = createColumnHelper<Product>();

const Products = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const { data: productResponse } = useProductList({
    page: currentPage,
    perPage,
  });

  const paginationMeta = productResponse?.meta;

  // Add an empty row at the end of the list
  const tableData = useMemo(() => {
    const productList = productResponse?.data || [];
    return [
      ...productList,
      {
        name: "...",
        skusIds: ["...."],
        attributes: [{ name: "....", values: ["...."] }],
      },
    ];
  }, [productResponse?.data]);

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
      columnHelper.accessor("skusIds", {
        header: "SKU IDs",
        cell: (info) => info.getValue().join(", ") || "",
      }),
      columnHelper.accessor("attributes", {
        header: "Attributes",
        cell: (info) => {
          const attributes = info.getValue();
          return attributes
            .map((attr) => `${attr.name}: ${attr.values.join(", ")}`)
            .join(" | ");
        },
      }),
    ],
    [t]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddProduct = () => {
    navigate("/products/add");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        <h1 css={titleStyles}>Products</h1>
        <Button onClick={handleAddProduct} variant="black">
          Add Product +
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
    </div>
  );
};

export default Products;
