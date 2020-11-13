import styled from "styled-components";

const ListLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 150px;
  gap: 20px;

  margin-top: 20px;

  & > div {
    border-radius: 8px;
  }
`;

export default ListLayout;
