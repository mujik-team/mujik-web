import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import * as mixtapeService from "../services/mixtapeService";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [mixtapeCoverImage, setMixtapeCoverImage] = useState("");

  const getMixtape = async () => {
    const mixtape = await mixtapeService.getMixtape(id);
    setMixtape(mixtape);
    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: any) => {
    delete updatedMixtape.mixtapeCoverImage;
    setMixtape({ ...mixtape, ...updatedMixtape });
    await mixtapeService.updateMixtape(id, updatedMixtape);
  };

  // This effect retrieves the mixtape's cover image.
  useEffect(() => {
    if (mixtape._id) {
      api
        .get(`/mixtape/${mixtape._id}/cover`, {
          responseType: "arraybuffer",
        })
        .then((res) => {
          if (res.status !== 404) {
            const image =
              "data:image/webp;base64," +
              Buffer.from(res.data, "binary").toString("base64");
            setMixtapeCoverImage(image);
          }
        })
        .catch((err) => {
          console.log("Unable to retrieve user profile image.");
        });
    }
  }, [mixtape]);

  useEffect(() => {
    setIsLoading(true);
    getMixtape();
  }, [id]);

  return {
    mixtape: { ...mixtape, mixtapeCoverImage },
    getMixtape,
    updateMixtape,
    isLoading,
  };
}

export default useMixtape;
