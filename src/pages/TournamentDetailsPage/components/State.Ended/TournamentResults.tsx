import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../../App";
import AvatarImage from "../../../../components/AvatarImage";
import TextInput from "../../../../components/Input/TextInput";
import MixtapeBrowser from "../../../../components/MixtapeBrowser/MixtapeBrowser";
import { GetSeveralMixtapes } from "../../../../services/mixtapeService";

function TournamentResults(props: Props) {
  const [mixtapes, setMixtapes] = useState([] as any[]);
  const [showRedeemReward, setShowRedeemReward] = useState(false);
  const history = useHistory();
  const authContext = useContext(AuthContext);

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

      const data = submissions.slice(0, 3);

      const elements = data.map((s, i) => {
        return (
          <div>
            <WinnerCard
              strokeColor={cardStrokes[i]}
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
          </div>
        );
      });

      return { data, elements };
    } else return { data: [], elements: [] };
  }, [props.tournament]);

  const yourSubmission = useMemo(() => {
    if (props.tournament) {
      const { username } = authContext.currentUser;
      const userSubmission = props.tournament.Submissions[username];
      // User has entered tournament.
      if (userSubmission) {
        // Check if user is a winner.
        const winnerIndex = winners.data.findIndex(
          (w) => w.CreatedBy === username
        );
        if (winnerIndex !== -1) {
          return (
            <div className="user-submission-container">
              <div className="title">Your Submission</div>
              <div className="desc">
                Congratulations! You won! Click below to redeem your rewards!
              </div>
              {winners.elements[winnerIndex]}
            </div>
          );
        } else {
          return (
            <div className="user-submission-container">
              <div className="title">Your Submission</div>
              <div className="desc">
                Thank you for entering this tournament. Click below to redeem
                your rewards!
              </div>
              <WinnerCard
                onClick={() =>
                  history.push(`/mixtape/${userSubmission.MixtapeId}`)
                }
              >
                <AvatarImage username={username} size={100} />
                <div className="details">
                  <div className="username">{username}</div>
                  <div className="num-votes">{`Received ${userSubmission.NumVotes} Votes`}</div>
                </div>
              </WinnerCard>
            </div>
          );
        }
      } else {
        return null;
      }
    }
  }, [props.tournament, winners]);

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
        {/* Tournament Winners */}
        {yourSubmission}

        <div>
          <div className="title">Winners</div>
          <div className="desc">
            Here are your winners! Click on them to view their winning mixtape!
          </div>
          {winners.elements}
        </div>
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

  .desc {
    font-family: var(--font-secondary);
    font-size: 16px;
    color: var(--text-inactive);
  }

  .title {
    font-size: 35px;
  }

  .user-submission-container {
    margin-bottom: 20px;
  }
`;

interface CardProps {
  strokeColor?: string;
}

const cardStrokes = ["#EFB30C", "#7D979E", "#D88B56"];

const WinnerCard = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: 0.2s ease-in all;

  box-shadow: ${(props: CardProps) =>
    props.strokeColor ? `inset 0px 0px 0px 1px ${props.strokeColor}` : "none"};

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
