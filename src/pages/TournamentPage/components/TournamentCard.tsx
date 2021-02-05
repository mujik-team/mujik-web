import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AvatarImage from "../../../components/AvatarImage";
import { apiBaseUrl } from "../../../services/api/apiService";
import { getImageToBase64 } from "../../../services/util";

function TournamentCard(props: Props) {
  const [image, setImage] = useState("");
  const history = useHistory();

  const handleClick = () => {
    history.push(`/tournament/${props.tournament._id}`);
  };

  // useEffect(() => {
  //   getImageToBase64(
  //     `/tournament/${props.tournament._id}/cover`
  //   ).then((image) => setImage(image || ""));
  // }, [props.tournament._id]);

  const StateTag = () => {
    if (props.tournament) {
      const submissionDate = Date.parse(props.tournament.SubmissionDate);
      const voteDate = Date.parse(props.tournament.VoteDate);
      const now = new Date().getTime();

      if (now < submissionDate)
        return <div className="state-tag open">OPEN</div>;
      else if (now > submissionDate && now < voteDate)
        return <div className="state-tag vote">VOTE</div>;
      else return <div className="state-tag ended">ENDED</div>;
    }
  };

  const url = `${apiBaseUrl}/tournament/${props.tournament._id}/cover`;
  return (
    <div className="tournament-card">
      <Card onClick={handleClick} base64image={url}>
        <span className="title">{props.tournament.Title}</span>

        <span className="details">
          <span className="coins">
            <img src="/icons/coin.svg" width="18px"></img>
            {props.tournament.Rewards[0].Value}
          </span>
          {StateTag()}
        </span>

        <AvatarImage
          disableOnClick
          username={props.tournament.CreatedBy}
          size={50}
        />
      </Card>
    </div>
  );
}

type Props = {
  tournament: any;
};

type CardProps = {
  base64image: string;
};

const Card = styled.div`
  font-family: var(--font-main);
  position: relative;
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.3s linear all;
  background-image: ${(props: CardProps) => `url(${props.base64image})`};
  background-position: center;
  background-size: cover;

  filter: grayscale(50%);

  .state-tag {
    padding: 5px 10px;
    border-radius: 99px;
    font-weight: 600;

    &.open {
      background-color: #44b169;
    }

    &.vote {
      background-color: #f4bf1a;
    }

    &.ended {
      background-color: #ff6464;
    }
  }

  & > .title {
    font-size: 16px;
    font-weight: 500;
    overflow: none;
    text-overflow: ellipsis;
    width: 100px;
    opacity: 1;
    transition: 0.2s linear all;
    border-radius: 99px;
    padding: 5px 10px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .details {
    position: absolute;
    top: 10px;
    right: 10px;

    display: flex;
    align-items: center;
  }

  .avatar-image {
    position: absolute;
    right: 10px;
    bottom: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  }

  .coins {
    display: flex;
    font-weight: 600;
    margin-right: 10px;

    & > img {
      margin-right: 5px;
    }
  }

  &:hover,
  &.selected {
    /* box-shadow: inset 0px 0px 0px 2px var(--main-color); */
    filter: none;
  }

  &:hover > .title {
    opacity: 1;
    transform: translateY(0%);
  }

  &::before {
    content: "";
    /* padding-bottom: calc(9 / 16 * 100%); */
    padding-bottom: 65%;
    display: block;
  }
`;

export default TournamentCard;
