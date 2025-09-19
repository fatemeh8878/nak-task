import { useEffect, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useAttributeDetails } from "../../hooks";
import { MultiSelectInput, SelectInput } from "../ui";
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
}: AttributeRowProps) => {
  const selectedAttributeId = useWatch({
    control,
    name: `attributes.${attributeIndex}.name`,
  });

  useEffect(() => {
    if (selectedAttributeId) {
      setValue(`attributes.${attributeIndex}.values`, []);
    }
  }, [selectedAttributeId, setValue, attributeIndex]);

  const { data: attributeDetails } = useAttributeDetails(
    selectedAttributeId || ""
  );

  const attributeOptionsDetails = useMemo(() => {
    if (!attributeDetails?.values || !Array.isArray(attributeDetails.values)) {
      return [];
    }
    return attributeDetails.values.map((val: string) => ({
      label: val,
      value: val,
    }));
  }, [attributeDetails?.values]);

  return (
    <div css={styles.attributeRow}>
      <div css={styles.attributeField}>
        <label>Attribute Name</label>
        <SelectInput
          options={attributeOptions || []}
          name={`attributes.${attributeIndex}.name`}
          control={control}
          fullWidth
          placeholder="Attribute"
          variant={isLast ? "default" : "rounded"}
        />
      </div>
      <div css={styles.attributeField}>
        <label>Attribute Values</label>
        <MultiSelectInput
          name={`attributes.${attributeIndex}.values`}
          control={control}
          disabled={attributeOptionsDetails.length === 0}
          placeholder="Values"
          variant={isLast ? "default" : "rounded"}
          fullWidth
          options={attributeOptionsDetails}
        />
      </div>
      {isLast && (
        <Button type="button" variant="white" onClick={handleAddAttribute}>
          Add
        </Button>
      )}
      {!isLast && (
        <Button
          type="button"
          variant="iconButton"
          css={styles.deleteIcon}
          onClick={onRemove}
        >
          شسی
        </Button>
      )}
    </div>
  );
};
