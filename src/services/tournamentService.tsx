import { api } from "./api";

export async function getTournament(id: string) {
  const { data } = await api.get(`/tournament/${id}`);
  return data.payload.tournament;
}

export async function createNewTournament(tournament: any) {
  const { data } = await api.post(`/tournament/`, tournament);
  return data.payload.tournament;
}

export async function deleteTournament(id: string) {
  const { data } = await api.delete(`/tournament/${id}`);
  return data.payload;
}

export async function updateTournament(id: string, tournament: any) {
  const { data } = await api.put(`/tournament/${id}`, tournament);
  return data.payload.tournament;
}

export async function followTournament(id: string, user: any, toFollow: boolean) {
  await api.post(`/tournament/${id}/follow`, { user, toFollow });
}