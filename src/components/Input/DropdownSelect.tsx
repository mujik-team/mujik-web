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
    <div className="p-float-label">
      <select>
        {options.map((option, index) => {
          return <option value={index}>{option}</option>;
        })}
      </select>
    </div>
  );
}

export default DropdownSelect;
