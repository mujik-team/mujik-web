import React, { useMemo } from "react";
import styled from "styled-components";
import DropdownSelect from "../../../components/Input/DropdownSelect";
import { Checkbox } from "primereact/checkbox";
import TextInput from "../../../components/Input/TextInput";
import { InputNumber } from "primereact/inputnumber";

function RestrictionEditorCard(props: Props) {
  // Returns input form depending on the type provided.
  const ValueEditor = useMemo(() => {
    switch (props.type) {
      case "dropdown":
        return (
          <RestrictionDropdown
            className="value-editor"
            options={props.valueOptions}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            className="value-editor"
            checked={props.value as boolean}
            onChange={(e) => props.onChange(e.checked)}
          />
        );

      case "text":
        return (
          <TextInput
            className="value-editor"
            value={props.value}
            onChange={(e: any) => props.onChange(e.target.value)}
          />
        );

      case "number":
        return (
          <InputNumber
            className="value-editor"
            showButtons
            min={1}
            buttonLayout="vertical"
            value={props.value as number}
            onChange={(e) => props.onChange(e.value)}
          />
        );

      default:
        return null;
    }
  }, [props.type, props.value]);

  return (
    <Card>
      <div className="restriction-title">{props.label}</div>

      <div className="editor-container">
        <div className="value-name">{props.valueLabel}</div>
        {ValueEditor}
      </div>
    </Card>
  );
}

export default RestrictionEditorCard;

type Props = {
  label: string;
  valueOptions?: string[];
  valueLabel: string;
  value: boolean | string | number;
  onChange: (value: any) => void;
  type: "checkbox" | "dropdown" | "text" | "number";
};

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  user-select: none;
  background: var(--card-color);
  border-radius: 6px;
  margin: 10px 0px;
  padding: 20px;

  & > .editor-container {
    display: flex;
    align-items: center;

    & > .value-name {
      margin-right: 20px;
    }

    & > .value-editor {
      width: 100px;

      & > .p-chkbox-icon {
        font-size: 30px;
      }

      & > .p-inputtext {
        font-family: var(--font-secondary) !important;
        font-size: 30px !important;
        font-weight: 600 !important;
      }

      & > button {
        background: var(--card-color-highlight) !important;
        color: var(--main-color) !important;
        border: none !important;
      }

      & > button:hover,
      & > button:focus {
        background: var(--main-color) !important;
        color: black !important;
      }
    }
  }

  & > .restriction-title {
    font-family: var(--font-secondary);
    font-weight: 600;
    font-size: 25px;
  }
`;

const RestrictionDropdown = styled(DropdownSelect)`
  font-weight: 600;
  width: 100px;

  background-color: var(--card-color-highlight);

  & > .p-dropdown-label {
    width: 100%;
    font-size: 35px;
  }
`;
