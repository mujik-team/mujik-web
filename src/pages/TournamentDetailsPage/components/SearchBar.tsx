import styled from "styled-components";
import { InputText } from "primereact/inputtext";

const SearchBar = styled(InputText)`
  font-family: "Fira Sans";
  font-size: 16px;
  margin-right: 10px;
  background-color: var(--card-color);
  border: none;
  height: 35px;
  border-radius: 8px;

  * {
    border: none;
    box-shadow: none;
  }
`;

export default SearchBar;
