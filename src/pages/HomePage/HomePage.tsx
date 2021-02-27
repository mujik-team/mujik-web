import React, { useContext, useEffect, useMemo, useState } from "react";
import FeaturedTournaments from "./components/FeaturedTournaments";
import styled from "styled-components";
import MixtapeCard from "../../components/MixtapeBrowser/components/MixtapeCard";
import AvatarImage from "../../components/AvatarImage";
import { MujikContext } from "../../App";
import { User } from "../../model/User";
import { Mixtape } from "../../model/Mixtape";

function HomePage() {
  const { api } = useContext(MujikContext);
  const [featuredMixtapes, setFeaturedMixtapes] = useState([] as Mixtape[]);
  const [featuredUsers, setFeaturedUsers] = useState([] as User[]);

  useEffect(() => {
    api.mixtape.GetFeaturedMixtapes().then((m) => setFeaturedMixtapes([...m]));
    api.user.GetFeaturedUsers().then((u) => setFeaturedUsers([...u]));
  }, []);

  const mixtapeCards = useMemo(() => {
    return featuredMixtapes.map((m) => {
      return <MixtapeCard mixtapeId={m.id} mixtapeName={m.title} />;
    });
  }, [featuredMixtapes]);

  return (
    <Container>
      <FeaturedTournaments />

      <div className="bottom">
        <div>
          <div className="section-title">Check out these mixtapes!</div>
          <div className="desc">
            Welcome! Here are some of the most popular mixtapes on mujik right
            now!
          </div>
          <div className="featured-mixtapes-container">{mixtapeCards}</div>
        </div>

        <div>
          <div className="section-title">Featured Users</div>
          <div className="desc">
            These are some of the best of the best at mujik. Check out their
            mixtapes!
          </div>

          <div className="featured-user-container">
            {featuredUsers.map((u) => {
              return (
                <UserCard>
                  <AvatarImage username={u.username} size={150} />
                </UserCard>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  padding-bottom: 100px;

  .bottom {
    margin: 10px 50px;
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 40px;
  }

  .section-title {
    font-size: 25px;
    color: var(--text-primary);
  }

  .featured-mixtapes-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    margin-top: 20px;
    gap: 15px;
  }

  .featured-user-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .desc {
    font-family: var(--font-secondary);
    font-size: 16px;
    color: var(--text-inactive);
  }
`;

const UserCard = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;

  .avatar-image {
    margin: auto;
  }
`;
