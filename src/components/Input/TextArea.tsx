import styled from "styled-components";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea = styled(InputTextarea)`
  font-family: "Inter";
  font-size: 14px;
  background-color: var(--card-color);
  border: none;
  resize: none;
  border-radius: 8px;

  & {
    box-shadow: none !important;
  }

  &:focus {
    box-shadow: 0px 0px 0px 2px var(--main-color) !important;
  }
`;
export default TextArea;
