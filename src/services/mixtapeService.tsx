import { api } from "./api";

export async function getMixtape(id: string) {
  const { data } = await api.get(`/mixtape/${id}`);
  return data.payload.mixtape;
}

export async function createNewMixtape(mixtape: any) {
  const { data } = await api.post(`/mixtape/`, mixtape);

  return data.payload.mixtape;
}

export async function deleteMixtape(id: string) {
  const { data } = await api.delete(`/mixtape/${id}`);
  return data.payload;
}

export async function updateMixtape(id: string, mixtape: any) {
  const { data } = await api.put(`/mixtape/${id}`, mixtape);

  return data.payload.mixtape;
}

export async function getSeveralMixtapes(ids: string[]): Promise<any[]> {
  const { data } = await api.post(`/mixtape/query/id`, { ids });
  return data.payload.mixtapes;
}
