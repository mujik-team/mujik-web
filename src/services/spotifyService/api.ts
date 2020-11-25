import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

export const init = (accessToken: string) => {
  api = axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export async function search(q: string) {
  const { data } = await api.get("/search", {
    params: { q, market: "US", type: "track" },
  });

  return data;
}

export async function getSeveralSongs(ids: string[]) {
  const params = {
    market: "US",
    ids: ids.toString(),
  };

  const { data } = await api.get("/tracks", {
    params,
  });

  return data.tracks;
}

export async function playSong(device_id: string, uris: string[]) {
  const body = { uris };

  const params = { device_id };

  const { data } = await api.put("/me/player/play", body, { params });
}
