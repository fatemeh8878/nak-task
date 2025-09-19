import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui";
import { ControlledInput } from "../components/ui/ControlledInput";
import { useAddAttribute } from "../hooks/useAtributers";
import {
  attributeSchema,
  type AttributeFormData,
} from "../schemas/attributeSchema";
import { theme } from "../styles/theme";

const AddAttribute = () => {
  const navigate = useNavigate();
  const { mutate } = useAddAttribute();
  const { control, handleSubmit } = useForm<AttributeFormData>({
    resolver: zodResolver(attributeSchema),
    values: {
      name: "",
      values: [{ value: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "values",
  });

  // Watch the first value to determine if add button should be enabled
  const firstValue = useWatch({
    control,
    name: "values.0.value",
  });

  const isFirstValueFilled = firstValue && firstValue.trim().length > 0;

  const handleAddValue = () => {
    if (isFirstValueFilled) {
      append({ value: "" });
    }
  };

  const onSubmit = handleSubmit((data) => {
    mutate(
      {
        name: data.name,
        values: data.values.map((value) => value.value),
      },
      {
        onSuccess: () => {
          navigate("/attributes");
        },
      }
    );
  });

  const handleCancel = () => {
    navigate("/attributes");
  };

  const containerStyles = css`
    padding: 70px 100px;
    max-width: 1288px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
  `;

  const titleStyles = css`
    font-size: ${theme.typography.fontSize["2xl"]};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.black};
    margin-bottom: ${theme.spacing.xl};
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
    flex: 1;
  `;

  const valuesRowStyles = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.md};
    align-items: flex-start;
    margin-bottom: ${theme.spacing.md};

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;

  const valueInputWrapperStyles = css`
    display: flex;
    gap: 4px;
    align-items: center;
  `;

  const buttonGroupStyles = css`
    display: flex;
    justify-content: space-between;
  `;

  const formStyles = css`
    display: flex;
    gap: ${theme.spacing.lg};
    height: 100%;
    flex: 1;
  `;

  const formContainerStyles = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  `;

  return (
    <div css={containerStyles}>
      <h1 css={titleStyles}>Add Attribute</h1>
      <form onSubmit={onSubmit} css={formContainerStyles}>
        <div css={formStyles}>
          <div css={inputGroupStyles}>
            <div css={inputContainerStyles}>
              <ControlledInput
                name="name"
                control={control}
                label="Name"
                variant="rounded"
              />
            </div>
          </div>

          <div css={valuesContainerStyles}>
            <div css={valuesRowStyles}>
              {fields.map((field, index) => {
                const isLastField = index === fields.length - 1;
                return (
                  <div key={field.id} css={valueInputWrapperStyles}>
                    <ControlledInput
                      label="Value"
                      name={`values.${index}.value`}
                      control={control}
                      variant="rounded"
                    />

                    {isLastField && (
                      <Button
                        variant="iconButton"
                        onClick={handleAddValue}
                        type="button"
                        size="xs"
                        disabled={!isFirstValueFilled}
                      >
                        +
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div css={buttonGroupStyles}>
          <Button
            variant="white"
            onClick={handleCancel}
            type="button"
            size="md"
          >
            Cancel
          </Button>
          <Button variant="black" type="submit" size="md">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAttribute;
