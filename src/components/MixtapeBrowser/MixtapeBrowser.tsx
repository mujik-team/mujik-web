import React, { ReactNode, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { randomMixtapes } from "../../services/random";
import SortDropdown from "../Input/SortDropdown";

type Props = {
  mixtapes?: any[];
  LeftHeaderContent?: ReactNode;
  RightHeaderContent?: ReactNode;
};

const Container = styled.div``;

const MixtapeGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 20px;
`;

const MixtapeCard = styled.div`
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: 0.2s ease-in all;

  /* background-image: url("/images/weeknd.png"); */
  background-position: center;
  background-size: cover;

  &:hover,
  &.selected {
    box-shadow: inset 0px 0px 0px 2px var(--main-color);
  }

  &::before {
    content: "";
    padding-bottom: 100%;
    display: block;
  }
`;

const Header = styled.div`
  padding-bottom: 50px;
`;

const LeftHeader = styled.div`
  display: block;
  float: left;
`;
const RightHeader = styled.div`
  display: block;
  float: right;
`;

const options = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];

function MixtapeBrowser(props: Props) {
  const history = useHistory();

  const [sortBy, setSortBy] = useState("");
  const cards = randomMixtapes().map((m, i) => (
    <MixtapeCard
      style={{ backgroundImage: `url(/images/mixtapes/${m.image})` }}
      onClick={() => history.push(`/mixtape/0`)}
    />
  ));
  return (
    <Container>
      <Header>
        <LeftHeader>{props.LeftHeaderContent}</LeftHeader>
        <RightHeader>
          <div className="p-float-label">
            <SortDropdown
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.value)}
              options={options}
            />
            <label htmlFor="sort-dropdown">Sort By</label>
          </div>
        </RightHeader>
      </Header>
      <hr />
      <MixtapeGridContainer>{cards}</MixtapeGridContainer>
    </Container>
  );
}

export default MixtapeBrowser;
