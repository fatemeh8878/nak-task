import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ControlledInput } from "../components/ui/ControlledInput";
import {
  attributeSchema,
  type AttributeFormData,
} from "../schemas/attributeSchema";
import { theme } from "../styles/theme";

const AddAttribute = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      values: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  const handleAddValue = () => {
    append({ value: "" });
  };

  const handleRemoveValue = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log("Saving attribute:", data);
    navigate("/attributes");
  });

  const handleCancel = () => {
    navigate("/attributes");
  };

  const containerStyles = css`
    padding: ${theme.spacing.xl};
    max-width: 1288px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  `;

  const titleStyles = css`
    font-size: ${theme.typography.fontSize["2xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xl};
    text-align: center;
  `;

  const inputGroupStyles = css`
    display: flex;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.lg};
    align-items: flex-start;
  `;

  const inputContainerStyles = css`
    flex: 1;
  `;

  const valuesContainerStyles = css`
    margin-bottom: ${theme.spacing.lg};
  `;

  const labelStyles = css`
    display: block;
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xs};
  `;

  const valuesRowStyles = css`
    display: flex;
    gap: ${theme.spacing.md};
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: ${theme.spacing.md};
  `;

  const valueInputWrapperStyles = css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `;

  const addButtonStyles = css`
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${theme.colors.primary[500]};
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.primary[600]};
    }
  `;

  const removeButtonStyles = css`
    background: none;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${theme.colors.error[500]};
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.error[600]};
    }
  `;

  const buttonGroupStyles = css`
    display: flex;
    gap: ${theme.spacing.md};
    justify-content: center;
    margin-top: ${theme.spacing.xl};
  `;

  const cancelButtonStyles = css`
    background: white;
    border: 1px solid ${theme.colors.text.black};
    color: ${theme.colors.text.black};
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    border-radius: 8px;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${theme.colors.gray[50]};
    }
  `;

  const saveButtonStyles = css`
    background: ${theme.colors.text.black};
    border: 1px solid ${theme.colors.text.black};
    color: white;
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    border-radius: 8px;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${theme.colors.gray[800]};
    }
  `;

  const formStyles = css`
    display: flex;
    gap: ${theme.spacing.lg};
  `;

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Add Attribute</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div css={formStyles}>
            <div css={inputGroupStyles}>
              <div css={inputContainerStyles}>
                <label css={labelStyles}>Name</label>
                <ControlledInput name="name" control={control} label="Name" />
              </div>
            </div>

            <div css={valuesContainerStyles}>
              <label css={labelStyles}>Values</label>

              {/* First row with two values side by side */}
              <div css={valuesRowStyles}>
                {fields.slice(0, 2).map((field, index) => {
                  const isLastField = index === fields.length - 1;
                  return (
                    <div key={field.id} css={valueInputWrapperStyles}>
                      <ControlledInput
                        label="Value"
                        name={`values.${index}.value`}
                        control={control}
                      />

                      {fields.length > 1 && (
                        <button
                          css={removeButtonStyles}
                          onClick={() => handleRemoveValue(index)}
                          type="button"
                        >
                          ×
                        </button>
                      )}
                      {isLastField && (
                        <button
                          css={addButtonStyles}
                          onClick={handleAddValue}
                          type="button"
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div css={buttonGroupStyles}>
            <button
              css={cancelButtonStyles}
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button css={saveButtonStyles} type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttribute;
