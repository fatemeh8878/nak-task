import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAttributeDetails } from "../../api/hooks";
import { Modal, MultiSelectInput, SelectInput } from "../ui";
import { Button } from "../ui/Button";
import { styles } from "./styles";
import { type AttributeRowProps } from "./types";

export const AttributeRow = ({
  attributeIndex,
  control,
  attributeOptions,
  onRemove,
  handleAddAttribute,
  isLast,
  setValue,
  allAttributes = [],
}: AttributeRowProps) => {
  const { t } = useTranslation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const selectedAttributeId = useWatch({
    control,
    name: `attributes.${attributeIndex}.name`,
  });

  // Only clear values when attribute changes, not when it's initially set
  useEffect(() => {
    // Check if this is a new attribute selection (not initial load)
    const currentValues =
      control._formValues?.attributes?.[attributeIndex]?.values;
    if (selectedAttributeId && (!currentValues || currentValues.length === 0)) {
      setValue(`attributes.${attributeIndex}.values`, []);
    }
  }, [selectedAttributeId, setValue, attributeIndex, control]);

  const { data: attributeDetails } = useAttributeDetails(
    selectedAttributeId || ""
  );

  const attributeOptionsDetails = useMemo(() => {
    if (!attributeDetails?.values || !Array.isArray(attributeDetails.values)) {
      return [];
    }

    // Get all selected values from all attributes except current one
    const selectedValues = allAttributes
      .filter((_, index) => index !== attributeIndex)
      .flatMap((attr) => attr.values || []);

    return attributeDetails.values
      .filter((val: string) => !selectedValues.includes(val))
      .map((val: string) => ({
        label: val,
        value: val,
      }));
  }, [attributeDetails?.values, allAttributes, attributeIndex]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onRemove();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div css={styles.attributeRow}>
      <div css={styles.attributeField}>
        <label>Attribute Name</label>
        <SelectInput
          options={attributeOptions || []}
          name={`attributes.${attributeIndex}.name`}
          control={control}
          fullWidth
          placeholder={t("attribute")}
          variant={isLast ? "default" : "rounded"}
        />
      </div>
      <div css={styles.attributeField}>
        <label>Attribute Values</label>
        <MultiSelectInput
          name={`attributes.${attributeIndex}.values`}
          control={control}
          disabled={attributeOptionsDetails.length === 0}
          placeholder={t("values")}
          variant={isLast ? "default" : "rounded"}
          fullWidth
          options={attributeOptionsDetails}
        />
      </div>
      {isLast && (
        <Button
          type="button"
          variant="white"
          onClick={handleAddAttribute}
          size="sm"
          disabled={!selectedAttributeId || selectedAttributeId.trim() === ""}
        >
          Add
        </Button>
      )}
      {!isLast && (
        <Button
          type="button"
          variant="iconButton"
          css={styles.deleteIcon}
          onClick={handleDeleteClick}
        >
          🗑️
        </Button>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        confirmText={t("yes")}
        cancelText={t("no")}
      >
        {t("deleteAttributeConfirm", { name: attributeDetails?.name })}
      </Modal>
    </div>
  );
};
