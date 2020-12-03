import styled from "styled-components";
import { Dropdown } from "primereact/dropdown";

const DropdownSelect = styled(Dropdown)`
  font-family: "Inter";
  background: var(--card-color);
  border: none;
  border-radius: 8px;
  /* width: 120px; */
  text-align: center;

  &.p-focus.p-dropdown {
    border: none;
    box-shadow: none;
  }

  & .p-dropdown-trigger {
    display: none;
  }
  & .p-dropdown-panel {
    background: var(--card-color);
    border: none;
    box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.144);
  }

  & .p-component,
  & .p-dropdown-label {
    font-family: "Inter";
    font-size: 16px;
  }

  & .p-dropdown-label {
    /* margin-top: 2px; */
    font-weight: bold;
  }
`;

export default DropdownSelect;
