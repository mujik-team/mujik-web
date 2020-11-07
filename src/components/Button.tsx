import styled from "styled-components";

const Button = styled.button`
  font-family: "Poppins";
  font-weight: 500;
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 8px;
  color: whitesmoke;
  transition: 0.1s ease-in all;
  background-color: var(--card-color);

  &:hover,
  &:focus {
    color: black;
    background-color: var(--main-color);
  }
`;

export default Button;
