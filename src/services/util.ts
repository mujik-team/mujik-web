import { api } from "./api/apiService";

export async function getImageToBase64(url: string) {
  try {
    const result = await api.get(url, {
      responseType: "arraybuffer",
    });

    if (result.status === 404) throw Error("image not found");

    const image =
      "data:image/webp;base64," +
      Buffer.from(result.data, "binary").toString("base64");

    return image;
  } catch (err) {
    return null;
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const MapToObject = (m: any) =>
  [...m].reduce((o, v) => {
    o[v[0]] = v[1];
    return o;
  }, {});

export const ObjectToMap = (o: any) =>
  new Map(Object.entries(o)) as Map<string, any>;
