import styled from "styled-components";

type Props = {
  image?: string;
};

const MixtapeListItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: 120px;
  gap: 20px;

  cursor: pointer;

  transition: 0.2s linear all;

  padding: 15px;

  &:hover {
    background-color: var(--card-color-highlight);
  }

  & > div.mixtape-image {
    background-image: ${(props: Props) => props.image};
    background-position: center;
    background-size: cover;
    border-radius: 8px;
  }

  & > div.mixtape-details > h2 {
    margin: 0;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > div.mixtape-details > div {
    font-family: "Fira Sans";
    color: var(--text-inactive);
    overflow: hidden;
    height: 90px;
    text-overflow: ellipsis;
  }
`;

export default MixtapeListItem;
