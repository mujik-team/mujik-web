import React, { useEffect, useState } from "react";

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

function useMockTournament(id: string) {
  const [tournament, setTournament] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  const getTournament = async () => {
    setIsLoading(true);
    await stall(500);
    setTournament(default_tournament);
    setIsLoading(false);
    return tournament;
  };

  const updateTournament = async (updatedTournament: any) => {
    console.log(updatedTournament);
    setIsLoading(true);
    await stall(600);
    setTournament({ ...tournament, ...updatedTournament });
    setIsLoading(false);
  };

  useEffect(() => {
    getTournament();
  }, [id]);

  return [tournament, getTournament, updateTournament, isLoading];
}

export default useMockTournament;

const default_tournament = {
  _id: "0",
  title: "DnD Campaign Music",
  creatorUsername: "cptmango",
  description:
    "Me and my friends are starting a new campaign and we are looking for",
  additionalSubmissionCriteria: "",
  state: "voting",
  image: null,
  followers: 43358,
  submissionDate: Date.now(),
  voteDate: Date.now(),
  winnerBy: "community_vote",
  ongoing: true,
  rewards: [
    {
      type: "coin",
      value: 1500000,
    },
    {
      type: "xp",
      value: 3000000,
    },
  ],
  restrictions: [
    {
      type: "song_limit",
      value: 100,
    },
    {
      type: "lvl_restriction",
      value: 70, // Minimum Level Restriction
    },
    {
      type: "allow_duplicates",
      value: false,
    },
    {
      type: "min_time",
      value: 640, // in minutes
    },
  ],
  tournamentModifiers: ["double_xp"],
  submissions: [
    {
      id: "5fb7598a41686c011e10f777",
      votes: 89,
    },
    {
      id: "5fb7599141686c011e10f778",
      votes: 32,
    },
    {
      id: "5fb7599741686c011e10f779",
      votes: 45,
    },
    {
      id: "5fb7599e41686c011e10f77a",
      votes: 65,
    },
    {
      id: "5fb759a541686c011e10f77b",
      votes: 76,
    },
    {
      id: "5fb759ac41686c011e10f77c",
      votes: 34,
    },
    {
      id: "5fb759b341686c011e10f77d",
      votes: 21,
    },
  ],
};
