import { css } from "@emotion/react";
import { useState } from "react";
import { theme } from "../../styles/theme";
import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  perPage: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  perPage,
}: PaginationProps) => {
  const [inputPage, setInputPage] = useState(currentPage.toString());

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      setInputPage(currentPage.toString());
    }
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const containerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${theme.spacing.lg};
    padding: ${theme.spacing.md} 0;
  `;

  const infoStyles = css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.gray[600]};
  `;

  const controlsStyles = css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `;

  const pageInputStyles = css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.sm};
  `;

  const inputStyles = css`
    width: 50px;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: ${theme.borderRadius.sm};
    text-align: center;
    font-size: ${theme.typography.fontSize.sm};

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary[500]};
    }
  `;

  const pageButtonStyles = css`
    min-width: 32px;
    height: 32px;
    padding: 0;
    font-size: ${theme.typography.fontSize.sm};
  `;

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <div css={containerStyles}>
      <div css={infoStyles}>
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      <div css={controlsStyles}>
        <Button
          variant="white"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          css={pageButtonStyles}
        >
          Previous
        </Button>

        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span
                css={css`
                  padding: 0 ${theme.spacing.sm};
                  color: ${theme.colors.text.gray[500]};
                `}
              >
                ...
              </span>
            ) : (
              <Button
                variant={currentPage === page ? "black" : "white"}
                size="sm"
                onClick={() => onPageChange(page as number)}
                css={pageButtonStyles}
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="white"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          css={pageButtonStyles}
        >
          Next
        </Button>

        <form css={pageInputStyles} onSubmit={handlePageInputSubmit}>
          <span>Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={inputPage}
            onChange={handlePageInputChange}
            css={inputStyles}
          />
        </form>
      </div>
    </div>
  );
};
