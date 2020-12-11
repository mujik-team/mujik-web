import React from "react";
import styled from "styled-components";

function TagInfo(props: Props) {
  const tags = [
    { name: "DOUBLE XP", color: "#FF6464" },
    { name: "NEW", color: "#6c63ff" },
  ];

  return (
    <Container>
      <div className="tags">
        <img id="coin" height="20" src="/icons/coin.svg" alt="mujik-coin" />
        <span className="coin-value">{103040}</span>
        {tags.map((t) => (
          <Tag color={t.color}>{t.name}</Tag>
        ))}
      </div>
    </Container>
  );
}

export default TagInfo;

type Props = {
  // tags: string[];
  // coins: number;
};

const Container = styled.div`
  display: inline-block;
  background-color: var(--card-color);
  border-radius: 8px;
  padding: 15px;

  & > .tags {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > .coin-value {
      font-weight: 600;
      font-size: 20px;
      margin-right: 15px;
      margin-left: 8px;
    }
  }
`;

type TagProps = {
  color: string;
};

const Tag = styled.div`
  background-color: ${(props: TagProps) => props.color};

  user-select: none;
  border-radius: 99px;
  padding: 4px 15px;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  margin-right: 5px;
`;
