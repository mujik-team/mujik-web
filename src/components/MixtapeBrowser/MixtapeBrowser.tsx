import React, { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { randomMixtapes } from "../../services/random";
import Button from "../Button";
import SortDropdown from "../Input/SortDropdown";
import CardLayout from "./components/CardLayout";
import ListLayout from "./components/ListLayout";
import MixtapeCard from "./components/MixtapeCard";
import MixtapeListItem from "./components/MixtapeListItem";

function MixtapeBrowser(props: Props) {
  const history = useHistory();
  const [sortBy, setSortBy] = useState("");
  const [isCardLayout, setIsCardLayout] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("layout")) {
      const setTo = localStorage.getItem("layout") === "card";
      setIsCardLayout(setTo);
    }
  }, []);

  const toggleCardLayout = () => {
    setIsCardLayout(!isCardLayout);
    localStorage.setItem("layout", !isCardLayout ? "card" : "list");
  };

  const description =
    "A really cool mixtape created by some cool guy who has a really good taste in mujik!!! Lemme write some more stuff over here so I can really pad out the length of this description! Oh boy still going!~";

  const mixtapeItems = randomMixtapes().map((m) =>
    isCardLayout ? (
      <MixtapeCard
        style={{ backgroundImage: `url(/images/mixtapes/${m.image})` }}
        onClick={() => history.push(`/mixtape/0`)}
      />
    ) : (
      <MixtapeListItem
        image={`url(/images/mixtapes/${m.image})`}
        onClick={() => history.push(`/mixtape/0`)}
      >
        <div className="mixtape-image" />
        <div className="mixtape-details">
          <h2>{m.name}</h2>
          <div>{description}</div>
        </div>
      </MixtapeListItem>
    )
  );

  const mixtapeLayout = (items: JSX.Element[]) => {
    return isCardLayout ? (
      <CardLayout>{items}</CardLayout>
    ) : (
      <ListLayout>{items}</ListLayout>
    );
  };

  const changeLayoutButton = (
    <ChangeLayoutButton onClick={() => toggleCardLayout()}>
      <i className={`mdi mdi-${isCardLayout ? "card" : "view-list"}`} />
    </ChangeLayoutButton>
  );

  return (
    <Container>
      <Header>
        <LeftHeader>{props.LeftHeaderContent}</LeftHeader>
        <RightHeader>
          <div
            style={{ display: "inline-block", marginRight: "10px" }}
            className="p-float-label"
          >
            <SortDropdown
              id="sort-dropdown"
              value={sortBy}
              onChange={(e: any) => setSortBy(e.value)}
              options={sortDropdownOptions}
            />
            <label htmlFor="sort-dropdown">Sort By</label>
          </div>
          {changeLayoutButton}
        </RightHeader>
      </Header>
      <hr />
      {mixtapeLayout(mixtapeItems)}
    </Container>
  );
}

export default MixtapeBrowser;

type Props = {
  mixtapes?: any[];
  LeftHeaderContent?: ReactNode;
  RightHeaderContent?: ReactNode;
};

const Container = styled.div``;

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

const ChangeLayoutButton = styled(Button)`
  position: relative;
  bottom: 8px;
  display: inline-block;
  font-size: 16px;
`;

const sortDropdownOptions = [
  { label: "Title", value: "name" },
  { label: "Length", value: "length" },
  { label: "Date Added", value: "submit" },
  { label: "Random", value: "random" },
];
