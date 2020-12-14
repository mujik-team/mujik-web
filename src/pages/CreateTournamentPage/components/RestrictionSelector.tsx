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

export const AvailableRestrictions: any = {
  max_songs: {
    label: "Max Number of Songs",
    valueLabel: "Num. Songs",
    value: "max_songs",
    type: "number",
  },
  min_songs: {
    label: "Minimum Number of Songs",
    valueLabel: "Num. Songs",
    value: "min_songs",
    type: "number",
  },
  min_lvl: {
    label: "Minimum Level",
    valueLabel: "Lvl.",
    value: "min_lvl",
    type: "dropdown",
    valueOptions: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  max_time: {
    label: "Max Mixtape Duration",
    valueLabel: "Minutes",
    value: "max_time",
    type: "number",
  },
  min_time: {
    label: "Minimum Mixtape Duration",
    valueLabel: "Minutes",
    value: "min_time",
    type: "number",
  },
  allow_duplicates: {
    label: "No Duplicates",
    valueLabel: "",
    value: "no_duplicates",
    type: "checkbox",
  },
};
