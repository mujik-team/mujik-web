import React, { useEffect, useState } from "react";
import * as TournamentService from "../services/tournamentService";

function useTournament(id: string) {
  const [tournament, setTournament] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTournament();
  }, [id]);

  const getTournament = async () => {
    const tournament = await TournamentService.GetTournament(id);
    setTournament(tournament);
    setIsLoading(false);
  };

  return {
    tournament,
    isLoading,
  };
}

export default useTournament;
