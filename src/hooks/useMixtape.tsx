import React, { useEffect, useState } from "react";
import api from "../services/api/apiService";
import { getImageToBase64 } from "../services/util";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState(null as any);
  const [isLoading, setIsLoading] = useState(true);
  const [mixtapeCoverImage, setMixtapeCoverImage] = useState("");

  const getMixtape = async () => {
    try {
      const mixtape = await api.mixtape.GetMixtape(id);

      setMixtape(mixtape);
    } catch (err) {}

    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: any) => {
    delete updatedMixtape.mixtapeCoverImage;
    setMixtape({ ...mixtape, ...updatedMixtape });
    await api.mixtape.UpdateMixtape(updatedMixtape);
  };

  // This effect retrieves the mixtape's cover image.
  useEffect(() => {
    if (mixtape?._id) {
      getImageToBase64(`/mixtape/${mixtape.id}/cover`).then((image) =>
        setMixtapeCoverImage(image || "")
      );
    }
  }, [mixtape]);

  useEffect(() => {
    setIsLoading(true);
    getMixtape();
  }, [id]);

  return {
    mixtape: { ...mixtape, mixtapeCoverImage },
    // mixtape,
    getMixtape,
    updateMixtape,
    setMixtape,
    isLoading,
  };
}

export default useMixtape;
