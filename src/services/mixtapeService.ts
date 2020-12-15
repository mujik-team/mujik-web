import { api } from "./api";

export async function getMixtape(id: string) {
  const { data } = await api.get(`/mixtape/${id}`);
  return data.payload.mixtape;
}

export async function createNewMixtape(mixtape: any) {
  const { data } = await api.post(`/mixtape/`, mixtape);

  return data.payload.mixtape;
}

export async function forkMixtape(username: string, mixtape: any) {
  const { data } = await api.post("/mixtape/fork", { username, mixtape });

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

export async function uploadMixtapeImage(id: string, imageBlob: Blob) {
  const formData = new FormData();
  formData.append("mixtape", imageBlob);
  await api.post("/upload/mixtape/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function GetSeveralMixtapes(ids: string[]): Promise<any[]> {
  const { data } = await api.post(`/mixtape/query/id`, { ids });
  return data.payload.mixtapes || [];
}

export async function GetFeaturedMixtapes() {
  const { data } = await api.get("/mixtape/featured");
  return data.payload.mixtapes;
}

export async function followMixtape(
  id: string,
  username: string,
  follow: boolean
) {
  await api.post(`/mixtape/${id}/follow`, { username, follow });
}
