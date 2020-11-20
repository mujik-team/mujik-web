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
    "_id": "0",
    "title": "DnD Campaign Music",
    "creator_username": "cptmango",
    "description": "Me and my friends are starting a new campaign and we are looking for",
    "additional_submission_criteria": "",
    "state": "submission",
    "image": null,
    "followers": 43358,
    "submission_date": Date.now(),
    "vote_date": Date.now(),
    "winner_by": "community_vote", 
    "ongoing": true,
    "rewards": [
        {
            "type": "coin",
            "value": 1500000
        },
        {
            "type": "xp",
            "value": 3000000,
        }
    ],
    "restrictions": [
      {
        "type": "song_limit",
        "value": 100
      },
      {
        "type": "lvl_restriction",
        "value": 70 // Minimum Level Restriction
      },
      {
        "type": "allow_duplicates",
        "value": false
      },
      {
        "type": "min_time",
        "value": 640 // in minutes
      }
    ],
    "tournament_modifiers": [
      "double_xp"
    ],
    "submissions": [
      {
        "id": "799d3b8c-0aa7-11eb-adc1-0242ac120002",
        "votes": 89
      },
      {
        "id": "43265fca-0b06-11eb-adc1-0242ac120002",
        "votes": 32
      }
    ]
  
}
  