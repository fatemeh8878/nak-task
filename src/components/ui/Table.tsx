import { css } from "@emotion/react";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { theme } from "../../styles/theme";

interface TableProps<T> {
  table: ReturnType<typeof useReactTable<T>>;
  emptyMessage?: string;
  variant?: "default" | "rounded";
}

export const Table = <T extends Record<string, unknown>>({
  table,
  emptyMessage = "No data available",
  variant = "default",
}: TableProps<T>) => {
  const tableContainerStyles = css`
    border-radius: ${variant === "rounded" ? "40px" : "20px"};
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

    &:first-of-type {
      width: 60px;
      min-width: 60px;
    }

    &:last-child {
      border-right: none;
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

    &:first-of-type {
      text-align: center;
      width: 60px;
      min-width: 60px;
    }

    &:last-child {
      border-right: none;
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

  const emptyRowStyles = css`
    border-bottom: 2px solid white;
    background: #ffffff66;
  `;

  const emptyCellStyles = css`
    padding: ${theme.spacing.lg} ${theme.spacing.xl};
    text-align: center;
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.gray};
    font-style: italic;
  `;

  return (
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} css={rowStyles}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} css={cellStyles}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr css={emptyRowStyles}>
              <td css={emptyCellStyles} colSpan={table.getAllColumns().length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
