import { css } from "@emotion/react";
import React from "react";
import { theme } from "../../styles/theme";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const overlayStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100000;
  `;

  const modalStyles = css`
    background: white;
    border-radius: 12px;
    padding: ${theme.spacing.xl};
    max-width: 400px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  `;

  const contentStyles = css`
    margin-bottom: ${theme.spacing.lg};
    color: ${theme.colors.text.gray};
  `;

  const footerStyles = css`
    display: flex;
    gap: ${theme.spacing.md};
    flex-direction: column;
  `;

  return (
    <div css={overlayStyles} onClick={onClose}>
      <div css={modalStyles} onClick={(e) => e.stopPropagation()}>
        <div css={contentStyles}>{children}</div>
        {onConfirm || onClose ? (
          <div css={footerStyles}>
            <Button
              variant="outlineError"
              onClick={onClose}
              loading={isLoading}
            >
              {cancelText}
            </Button>
            {onConfirm && (
              <Button variant="error" onClick={onConfirm} loading={isLoading}>
                {confirmText}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
