import { css } from "@emotion/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { theme } from "../styles/theme";

// Define the attribute type
type Attribute = {
  id: number;
  name: string;
  values: string;
};

// Sample data
const defaultData: Attribute[] = [
  {
    id: 1,
    name: "Size",
    values: "Large, Medium, X Large, Small",
  },
];

const columnHelper = createColumnHelper<Attribute>();

const Attributes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data] = useState<Attribute[]>(defaultData);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "",
        cell: () => 1,
      }),
      columnHelper.accessor("name", {
        header: t("name"),
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("values", {
        header: "Values",
        cell: (info) => info.getValue(),
      }),
    ],
    [t]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleAddAttribute = () => {
    navigate("/attributes/add");
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

  const tableStyles = css`
    width: 100%;
    border-collapse: collapse;
  `;

  const headerCellStyles = css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    text-align: center;
    font-weight: ${theme.typography.fontWeight.bold};
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.black};
    background-color: #00000005;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    width: auto;

    &:first-child {
      width: 60px;
      min-width: 60px;
    }

    &:nth-child(2) {
      width: 200px;
      min-width: 200px;
    }

    &:last-child {
      border-right: none;
      width: auto;
      min-width: 300px;
    }
  `;

  const cellStyles = css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    text-align: center;
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.black};
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    width: auto;

    &:first-child {
      text-align: center;
      width: 60px;
      min-width: 60px;
    }

    &:nth-child(2) {
      width: 200px;
      min-width: 200px;
    }

    &:last-child {
      border-right: none;
      width: auto;
      min-width: 300px;
    }
  `;

  const rowStyles = css`
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    background: #ffffff66;

    &:hover {
      background-color: ${theme.colors.gray[50]};
    }
  `;

  return (
    <div css={containerStyles}>
      <div css={headerStyles}>
        <h1 css={titleStyles}>{t("attributes")}</h1>
        <Button onClick={handleAddAttribute} variant="primary">
          Add Attribute +
        </Button>
      </div>

      <div css={tableContainerStyles}>
        <table css={tableStyles}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} css={headerCellStyles}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} css={rowStyles}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} css={cellStyles}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attributes;
