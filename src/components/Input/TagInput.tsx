import styled from "styled-components";
import { Chips } from "primereact/chips";

const TagInput = styled(Chips)`
  & > .p-inputtext {
    font-family: "Fira Sans";
    font-size: 16px;
    padding: 10px 15px;
    background-color: var(--card-color);
    border: none;
    border-radius: 8px;

    box-shadow: none !important;
  }

  & {
  }
`;

export default TagInput;
