import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import TextInput from "../../../../components/Input/TextInput";
import MixtapeBrowser from "../../../../components/MixtapeBrowser/MixtapeBrowser";
import { GetSeveralMixtapes } from "../../../../services/mixtapeService";

function TournamentResults(props: Props) {
  const [mixtapes, setMixtapes] = useState([] as any[]);

  useEffect(() => {
    if (props.tournament) {
      const mixtapeIds = Object.values(props.tournament.Submissions).map(
        (s: any) => s.MixtapeId
      );
      GetSeveralMixtapes([...mixtapeIds]).then((mixtapes) =>
        setMixtapes([...mixtapes])
      );
    }
  }, [props.tournament]);

  const winners = useMemo(() => {
    if (props.tournament) {
      // Iterate through the submissions and find the highest 3.
      const submissions = Object.keys(props.tournament.Submissions)
        .map((k) => {
          return { ...props.tournament.Submissions[k], CreatedBy: k };
        })
        .sort((t1, t2) => t2.NumVotes - t1.NumVotes);

      return submissions.slice(0, 3);
    } else return [];
  }, [props.tournament]);

  const SearchBar = (
    <div className="p-input-icon-left">
      <i
        style={{ fontSize: "20px", top: "45%" }}
        className="pi mdi mdi-magnify"
      ></i>
      <TextInput />
    </div>
  );

  return (
    <Container>
      <div>
        <MixtapeBrowser LeftHeaderContent={SearchBar} mixtapes={mixtapes} />
      </div>
      <div>
        <h1>Winners</h1>
        <hr />

        {winners?.map((s) => (
          <div>
            <h2>{s.CreatedBy}</h2>
            <WinnerCard style={{ width: "100%", height: "80px" }} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default TournamentResults;

interface Props {
  tournament: any;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  gap: 100px;
`;

const WinnerCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s ease-in all;

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }
`;
