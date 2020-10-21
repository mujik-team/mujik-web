import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-family: "Poppins";
  font-weight: 500;
  border: none;
  padding: 5px 15px;
  border-radius: 999px;
  cursor: pointer;
  color: whitesmoke;
  transition: 0.1s ease-in all;
  background-color: var(--card-color);

  &:hover {
    color: black;
    background-color: var(--main-color);
  }
`;

export default Button;
