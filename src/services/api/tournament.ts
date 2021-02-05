import { Tournament } from "../../model/Tournament";
import { api } from "./apiService";

export async function GetTournament(id: string) {
  const { data } = await api.get(`/tournament/${id}`);

  return data.payload as Tournament;
}

export async function CreateTournament(tournament: Tournament) {
  const { data } = await api.post(`/tournament`, tournament);

  return data.payload as Tournament;
}

export async function UpdateTournament(tournament: Tournament) {
  const { data } = await api.put(`/tournament/${tournament.id}`, tournament);
  return data.payload as Tournament;
}

export async function DeleteTournament(id: string) {
  const { data } = await api.delete(`/tournament/${id}`);
  return data;
}

export async function RedeemRewards(username: string, tournamentId: string) {}

export async function UploadTournamentImage(id: string, image: Blob) {
  const formData = new FormData();
  formData.append("file", image);
  await api.post(`/tournament/${id}/image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
