import { css } from "@emotion/react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAttributerList } from "../api/hooks/useAttributes";
import { type Attribute } from "../api/types";
import { Button, Table } from "../components/ui";
import { theme } from "../styles/theme";

const Attributes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: attributerList } = useAttributerList();

  // Add an empty row at the end of the list
  const tableData = useMemo(() => {
    const data = attributerList || [];
    return [...data, { name: "...", values: ["...."] }];
  }, [attributerList]);

  // Table configuration
  const columnHelper = createColumnHelper<Attribute>();
  const attributeTable = useReactTable({
    data: tableData,
    columns: [
      columnHelper.display({
        id: "id",
        header: "",
        cell: (info) => info.row.index + 1,
      }),
      columnHelper.accessor("name", {
        header: t("name"),
      }),
      columnHelper.accessor("values", {
        header: "values",
        cell: (info) => info.getValue().join(", ") || "",
      }),
    ],
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

  return (
    <div css={containerStyles}>
      <div css={headerStyles}>
        <h1 css={titleStyles}>{t("attributes")}</h1>
        <Button onClick={handleAddAttribute} variant="black">
          {t("addAttribute")} +{" "}
        </Button>
      </div>

      <Table<Attribute>
        table={attributeTable}
        emptyMessage={t("noAttributesAvailable")}
      />
    </div>
  );
};

export default Attributes;
