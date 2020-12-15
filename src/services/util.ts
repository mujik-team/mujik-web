import { api } from "./api";

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
