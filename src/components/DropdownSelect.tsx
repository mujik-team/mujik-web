import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  font-family: "Poppins";

  & select {
    display: none; // hide original select element.
  }
`;
const options = ["Title", "Length", "Date Added", "Random"];

function DropdownSelect() {
  return (
    <Container>
      <select>
        {options.map((option, index) => {
          return <option value={index}>{option}</option>;
        })}
      </select>
    </Container>
  );
}

export default DropdownSelect;
