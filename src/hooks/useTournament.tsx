import React, { useEffect, useState } from "react";
import * as TournamentService from "../services/tournamentService";
import { getImageToBase64 } from "../services/util";

function useTournament(id: string) {
  const [tournament, setTournament] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  const [tournamentImage, setTournamentImage] = useState("" as any);

  useEffect(() => {
    getTournament();
  }, [id]);

  useEffect(() => {
    if (tournament.TournamentId)
      getImageToBase64(`/tournament/${id}/cover`).then((image) =>
        setTournamentImage(image || "")
      );
  }, [tournament]);

  const getTournament = async () => {
    const tournament = await TournamentService.GetTournament(id);
    setTournament(tournament);
    setIsLoading(false);
  };

  const updateTournament = async (updatedTournament: any) => {
    delete updatedTournament.tournamentImage;
    setTournament({ ...tournament, ...updatedTournament });
    await TournamentService.UpdateTournament(id, updatedTournament);
  };

  return {
    tournament,
    isLoading,
    tournamentImage,
    updateTournament,
  };
}

export default useTournament;
