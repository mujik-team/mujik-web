import styled from "styled-components";
import { InputText } from "primereact/inputtext";

const TextInput = styled(InputText)`
  font-family: "Fira Sans";
  font-size: 16px;
  margin-right: 10px;
  background-color: var(--card-color);
  border: none;
  height: 35px;
  border-radius: 8px;

  & {
    box-shadow: none !important;
  }

  &:focus {
    box-shadow: inset 0px 0px 0px 2px var(--main-color) !important;
  }
`;

export default TextInput;
