import React, { useState } from "react";
import styled from "styled-components";
import { MultiSelect } from "primereact/multiselect";
import DropdownSelect from "../../../components/Input/DropdownSelect";

function RestrictionSelector() {
  const [selectedRestrictions, setSelectedRestrictions] = useState([] as any[]);

  return (
    <div>
      <MultiSelect
        value={selectedRestrictions}
        options={AvailableRestrictions}
        optionValue="label"
        onChange={(e) => setSelectedRestrictions([...e.target.value])}
      />

      {selectedRestrictions?.map((r) => (
        <RestrictionCard restriction={r} />
      ))}
    </div>
  );
}

export default RestrictionSelector;

function RestrictionCard(props: any) {
  const [selectedValue, setSelectedValue] = useState(null as any);
  const options = [];

  for (let i = 1; i < 10; i++) {
    options.push({
      label: i * 10,
      value: i * 10,
    });
  }

  return (
    <Card>
      <RestrictionName> {props.restriction}</RestrictionName>
      <div>
        Lvl.
        <RestrictionDropdown
          options={options}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      </div>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  user-select: none;
  background: var(--card-color);
  border-radius: 6px;
  margin: 10px 0px;
  padding: 20px;
`;

const RestrictionName = styled.div`
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 25px;
`;

const RestrictionDropdown = styled(DropdownSelect)`
  font-weight: 600;
  width: 100px;

  background-color: var(--card-color-highlight);

  & > .p-dropdown-label {
    width: 100%;
    font-size: 35px;
  }
`;

const AvailableRestrictions = [
  {
    label: "Song Limit",
    value: "song_limit",
  },
  {
    label: "Minimum Level",
    value: "min_lvl",
  },
  {
    label: "Time Limit",
    value: "time_limit",
  },
  {
    label: "Allow Duplicates",
    value: "allow_duplicates",
  },
];
