import { css } from "@emotion/react";
import { theme } from "../../styles/theme";

export const styles = {
  container: css`
    padding: 70px 100px;
    max-width: 1288px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
  title: css`
    font-size: ${theme.typography.fontSize["2xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xl};
  `,
  formContainer: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  `,
  formContent: css`
    display: flex;
    gap: ${theme.spacing.lg};
    flex-direction: column;
    height: 100%;
    flex: 1;
  `,
  formGroup: css`
    margin-bottom: ${theme.spacing.lg};
  `,
  label: css`
    display: block;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xs};
  `,
  buttonGroup: css`
    display: flex;
    justify-content: space-between;
  `,
  attributeRow: css`
    display: flex;
    align-items: center;
    gap: 24px;
  `,
  attributeField: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    width: 100%;
  `,
  deleteIcon: css`
    color: ${theme.colors.error[500]};
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      color: ${theme.colors.error[600]};
    }
  `,
};
