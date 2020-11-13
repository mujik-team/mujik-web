import styled from "styled-components";

const CardLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 20px;
`;

export default CardLayout;
