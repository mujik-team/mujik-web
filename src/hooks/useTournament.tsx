import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { Tournament } from "../model/Tournament";
import { getImageToBase64 } from "../services/util";

function useTournament(id: string) {
  const { api } = useContext(AuthContext);
  const [tournament, setTournament] = useState({} as Tournament);
  const [isLoading, setIsLoading] = useState(true);

  const [tournamentImage, setTournamentImage] = useState("" as any);

  useEffect(() => {
    getTournament();
  }, [id]);

  useEffect(() => {
    getImageToBase64(`/tournament/${id}/cover`).then((image) =>
      setTournamentImage(image || "")
    );
  }, [tournament]);

  const getTournament = async () => {
    setIsLoading(true);
    setTournament(await api.tournament.GetTournament(id));
    setIsLoading(false);
  };

  const updateTournament = async (updatedTournament: any) => {
    delete updatedTournament.tournamentImage;
    setTournament({ ...tournament, ...updatedTournament });
    await api.tournament.UpdateTournament(updatedTournament);
  };

  return {
    tournament,
    isLoading,
    tournamentImage,
    updateTournament,
  };
}

export default useTournament;
