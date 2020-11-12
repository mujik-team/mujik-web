import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState(null as any);
  const [isLoading, setIsLoading] = useState(true);

  const getMixtape = async () => {
    const { data } = await api.get(`/mixtape/${id}`);
    setMixtape(data.payload.mixtape);
    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: any) => {
    const { data } = await api.put(`/mixtape/${id}`, {
      mixtape: updateMixtape,
    });
    setMixtape(data.payload.mixtape);
    setIsLoading(false);
  };

  useEffect(() => {
    getMixtape();
    setIsLoading(true);
  }, [id]);

  return [mixtape, getMixtape, setMixtape, updateMixtape, isLoading];
}

export default useMixtape;
