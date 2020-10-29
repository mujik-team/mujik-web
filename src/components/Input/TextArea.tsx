import styled from "styled-components";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea = styled(InputTextarea)`
  font-family: "Fira Sans";
  font-size: 14px;
  background-color: var(--card-color);
  border: none;
  border-radius: 8px;

  & {
    box-shadow: none !important;
  }
`;
export default TextArea;
