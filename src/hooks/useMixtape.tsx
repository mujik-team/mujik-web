import React, { useEffect, useState } from "react";
import * as mixtapeService from "../services/mixtapeService";
import { getImageToBase64 } from "../services/util";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState(null as any);
  const [isLoading, setIsLoading] = useState(true);
  const [mixtapeCoverImage, setMixtapeCoverImage] = useState("");

  const getMixtape = async () => {
    try {
      const doc = await mixtapeService.getMixtape(id);
      setMixtape(doc);
    } catch (err) {}

    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: any) => {
    delete updatedMixtape.mixtapeCoverImage;
    setMixtape({ ...mixtape, ...updatedMixtape });
    await mixtapeService.updateMixtape(id, updatedMixtape);
  };

  // This effect retrieves the mixtape's cover image.
  useEffect(() => {
    if (mixtape?._id) {
      getImageToBase64(`/mixtape/${mixtape._id}/cover`).then((image) =>
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
