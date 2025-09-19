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
  modalOverlay: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000000;
  `,
  modalContent: css`
    background: white;
    padding: 24px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    text-align: center;

    modalText {
      font-size: 20px;
      margin: 0 0 16px 0;
    }
  `,
  modalText: css`
    margin: 0 0 24px 0;
      font-size: 20px;
      font-weight: 600;
      color: ${theme.colors.text.black};
    }

    modalText {
      margin: 0 0 24px 0;
      color: ${theme.colors.text.gray[600]};
    }
  `,
  modalButtons: css`
    display: flex;
    gap: 12px;
    flex-direction: column;
    justify-content: center;
  `,
  cancelButton: css`
    padding: 8px 16px;
    border: 1px solid ${theme.colors.gray[300]};
    background: white;
    color: ${theme.colors.text.gray[700]};
    border-radius: 6px;
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      background: ${theme.colors.gray[50]};
    }
  `,
  confirmButton: css`
    padding: 8px 16px;
    border: none;
    background: ${theme.colors.error[500]};
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: ${theme.typography.fontSize.sm};

    &:hover {
      background: ${theme.colors.error[600]};
    }
  `,
};
