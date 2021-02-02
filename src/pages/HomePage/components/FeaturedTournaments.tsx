import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Carousel } from "primereact/carousel";
import { GetFeaturedTournaments } from "../../../services/tournamentService";
import TournamentCard from "../../TournamentPage/components/TournamentCard";

function FeaturedTournaments() {
  const history = useHistory();
  const [tournaments, setTournaments] = useState([] as any[]);

  useEffect(() => {
    // GetFeaturedTournaments().then((t) =>
    //   setTournaments([...t.filter((t: any) => t !== null)])
    // );
  }, []);

  const getTournamentCard = (tourney: any) => {
    return <TournamentCard tournament={tourney} />;
  };

  return (
    <Container>
      <Carousel
        className="featured"
        // autoplayInterval={5000}
        value={tournaments}
        itemTemplate={getTournamentCard}
        numVisible={4}
        numScroll={1}
        // header={<div className="title">Featured</div>}
      />
      {/* <FeaturedTournamentsGrid>{featured}</FeaturedTournamentsGrid> */}
    </Container>
  );
}

export default FeaturedTournaments;

const Container = styled.div`
  margin: 30px;

  .tournament-card {
    /* width: 200px; */
  }

  .featured {
    .p-carousel-item {
      padding: 0 10px !important;
    }
  }
`;
