import React, { useState } from "react";
import styled from "styled-components";
import { MultiSelect } from "primereact/multiselect";
import RestrictionEditorCard from "./RestrictionEditorCard";

function RestrictionSelector(props: Props) {
  const [selectedRestrictions, setSelectedRestrictions] = useState([] as any[]);
  const selectedRestrictionValues = props.values;

  return (
    <Container>
      <MultiSelect
        className="multi-select"
        value={selectedRestrictions}
        options={Object.keys(AvailableRestrictions).flatMap(
          (key) => AvailableRestrictions[key]
        )}
        optionValue="value"
        onChange={(e) => setSelectedRestrictions([...e.target.value])}
      />

      {selectedRestrictions?.map((key) => {
        const r = AvailableRestrictions[key];

        return (
          <RestrictionEditorCard
            label={r.label}
            valueOptions={r.valueOptions}
            type={r.type}
            valueLabel={r.valueLabel}
            value={selectedRestrictionValues[key]}
            onChange={(val) => props.handleChangeValue(key, val)}
          />
        );
      })}
    </Container>
  );
}

export default RestrictionSelector;

type Props = {
  values: any;
  handleChangeValue: (key: string, value: any) => void;
};

const Container = styled.div`
  & > .multi-select {
    width: 100%;
  }
`;

const AvailableRestrictions: any = {
  song_limit: {
    label: "Song Limit",
    valueLabel: "Num. Songs",
    value: "song_limit",
    type: "number",
  },
  min_lvl: {
    label: "Minimum Level",
    valueLabel: "Lvl.",
    value: "min_lvl",
    type: "dropdown",
    valueOptions: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  time_limit: {
    label: "Time Limit",
    valueLabel: "Minutes",
    value: "time_limit",
    type: "number",
  },
  allow_duplicates: {
    label: "Allow Duplicates",
    valueLabel: "",
    value: "allow_duplicates",
    type: "checkbox",
  },
};
