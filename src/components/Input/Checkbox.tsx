import styled from "styled-components";
import React from "react";

const Container = styled.div`
  position: relative;

  & label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: 0;
    position: absolute;
    top: 0;
    width: 28px;
  }

  & label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
  }

  & input[type="checkbox"] {
    visibility: hidden;
  }

  & input[type="checkbox"]:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
  }

  & input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
`;

type Props = {
  label?: string;
};

function Checkbox(props: Props) {
  return (
    <div>
      <Container>
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox"></label>
      </Container>
    </div>
  );
}

export default Checkbox;
