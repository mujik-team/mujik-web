import { Mixtape } from "../../model/Mixtape";
import { api } from "./apiService";

export async function CreateMixtape(mixtape: Mixtape): Promise<Mixtape> {
  const { data } = await api.post("/mixtape", mixtape);
  return data.payload;
}

export async function UploadMixtapeImage(id: string, image: Blob) {
  const formData = new FormData();
  formData.append("file", image);
  await api.post(`/mixtape/${id}/cover`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function GetMixtape(id: string): Promise<Mixtape> {
  const { data } = await api.get(`/mixtape/${id}`);
  return data.payload;
}

export async function UpdateMixtape(mixtape: Mixtape): Promise<Mixtape> {
  const { data } = await api.put(`/mixtape/${mixtape.id}`, mixtape);
  return data.payload;
}

export async function DeleteMixtape(id: string): Promise<void> {
  await api.delete(`/mixtape/${id}`);
}

export async function GetUserMixtapes(username: string): Promise<Mixtape[]> {
  const { data } = await api.get(`/user/${username}/mixtape`);
  return data.payload;
}

interface Query {
  username?: string;
  ids?: string;
}

export async function QueryMixtapes(query: Query): Promise<Mixtape[]> {
  const { data } = await api.post(`/mixtape/query`, query);
  return data.payload;
}
