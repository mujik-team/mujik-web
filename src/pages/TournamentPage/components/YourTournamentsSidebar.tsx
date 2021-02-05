import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../../App";
import { getImageToBase64 } from "../../../services/util";

function YourTournamentsSidebar() {
  const { user } = useContext(AuthContext);
  const [yourTournaments, setYourTournaments] = useState([] as any[]);
  const [filterBy, setFilterBy] = useState("All");

  const history = useHistory();

  useEffect(() => {
    const profile = user.profile;

    // @TODO TEMPFIX USER MODEL ON API TO PROPERLY SERIALIZE.
    // const tournamentsFollowed = profile.tournamentsFollowing || [];
    // const tournamentsJoined = profile.tournamentsJoined || [];
    // const tournamentsCreated = profile.tournamentsCreated || [];

    // const set = new Set([
    //   ...tournamentsFollowed,
    //   ...tournamentsJoined,
    //   ...tournamentsCreated,
    // ]);

    // const allTournaments = [...set];

    // const mapping: any = {
    //   All: allTournaments,
    //   Entered: tournamentsJoined,
    //   Following: tournamentsFollowed,
    //   Created: tournamentsCreated,
    // };

    // GetMultipleTournaments(mapping[filterBy]).then((tournaments) =>
    //   setYourTournaments([...tournaments])
    // );
  }, [user.profile, filterBy]);

  const FilterByTabs = (
    <div>
      {tabs.map((f) => (
        <span
          className={`tab ${filterBy === f && "active"}`}
          onClick={() => setFilterBy(f)}
        >
          {f}
        </span>
      ))}
    </div>
  );

  return (
    <Container>
      <div className="title">Your Tournaments</div>
      {FilterByTabs}
      {yourTournaments.length !== 0 ? (
        yourTournaments.map((t) => (
          <TournamentCard onClick={() => history.push(`/tournament/${t._id}`)}>
            {t.Title}
          </TournamentCard>
        ))
      ) : (
        <TournamentCard>
          No tournaments entered, followed or created.
        </TournamentCard>
      )}
    </Container>
  );
}

export default YourTournamentsSidebar;

const tabs = ["All", "Entered", "Following", "Created"];

const Container = styled.div`
  .title {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .tab {
    cursor: pointer;
    font-family: var(--font-secondary);
    font-weight: 500;
    font-size: 20px;
    color: var(--text-inactive);
    margin-right: 10px;

    &:hover,
    &.active {
      color: var(--text-primary);
    }
  }
`;

type SidebarCardProps = {
  image?: any;
};

const TournamentCard = styled.div`
  cursor: pointer;

  background-image: ${(props: SidebarCardProps) => `url(${props.image})`};
  background: var(--card-color);
  border-radius: 8px;
  width: 100%;
  padding: 20px 20px;
  margin: 10px 0;

  font-family: var(--font-secondary);
  font-weight: 600;
  color: var(--text-inactive);
  border: thin solid #333333;

  transition: 0.15s linear all;

  &:hover {
    background: var(--card-color-highlight);
    color: var(--text-primary);
  }
`;
