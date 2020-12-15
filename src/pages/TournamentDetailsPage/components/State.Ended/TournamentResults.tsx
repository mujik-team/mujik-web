import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AvatarImage from "../../../../components/AvatarImage";
import TextInput from "../../../../components/Input/TextInput";
import MixtapeBrowser from "../../../../components/MixtapeBrowser/MixtapeBrowser";
import { GetSeveralMixtapes } from "../../../../services/mixtapeService";

function TournamentResults(props: Props) {
  const [mixtapes, setMixtapes] = useState([] as any[]);
  const history = useHistory();

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
        <div className="winner-title">Winners</div>
        <div className="winner-desc">
          Here are your winners! Click on them to view their winning mixtape!
        </div>
        {winners?.map((s, i) => (
          <WinnerCard
            key={i}
            onClick={() => history.push(`/mixtape/${s.MixtapeId}`)}
          >
            <AvatarImage username={s.CreatedBy} size={100} />
            <div className="details">
              <div className="username">{s.CreatedBy}</div>
              <div className="num-votes">{`Received ${s.NumVotes} Votes`}</div>
            </div>

            <img
              src={`/images/medals/medal-${i + 1}.svg`}
              height={80}
              alt={`${i} Place`}
              className="medal"
            />
          </WinnerCard>
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

  .winner-desc {
    font-family: var(--font-secondary);
    font-size: 16px;
    color: var(--text-inactive);
  }

  .winner-title {
    font-size: 35px;
  }
`;

const WinnerCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: 0.2s ease-in all;

  margin-top: 15px;
  padding: 20px;

  background-color: var(--card-color);
  cursor: pointer;

  &:hover {
    background-color: var(--card-color-highlight);
  }

  .details {
    margin-left: 20px;
  }
  .username {
    font-weight: 500;
    font-size: 35px;
  }

  .num-votes {
    font-family: var(--font-secondary);
    color: var(--text-inactive);
    font-weight: 600;
  }

  .medal {
    margin-left: auto;
  }
`;
