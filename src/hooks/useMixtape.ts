import React, { useEffect, useState } from "react";
import { Mixtape } from "../model/Mixtape";
import api from "../services/api/apiService";
import { UploadMixtapeImage } from "../services/api/mixtape";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState({} as Mixtape);
  const [isLoading, setIsLoading] = useState(true);

  const getMixtape = async () => {
    try {
      const mixtape = await api.mixtape.GetMixtape(id);

      setMixtape(mixtape);
    } catch (err) {}

    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: Mixtape) => {
    setMixtape({ ...mixtape, ...updatedMixtape });
    await api.mixtape.UpdateMixtape(updatedMixtape);
  };

  const uploadMixtapeImage = async (id: string, image: Blob) => {
    await UploadMixtapeImage(id, image);
  };

  useEffect(() => {
    setIsLoading(true);
    getMixtape();
  }, [id]);

  return {
    mixtape,
    actions: {
      getMixtape,
      updateMixtape,
      uploadMixtapeImage,
    },
    isLoading,
  };
}

export default useMixtape;
