import styled from "styled-components";

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

export default MixtapeCard;
