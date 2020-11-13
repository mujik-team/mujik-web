import React, { useEffect, useState } from "react";
import * as mixtapeService from "../services/mixtapeService";

function useMixtape(id: string) {
  const [mixtape, setMixtape] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  const getMixtape = async () => {
    const mixtape = await mixtapeService.getMixtape(id);
    setMixtape(mixtape);
    setIsLoading(false);
  };

  const updateMixtape = async (updatedMixtape: any) => {
    setMixtape({ ...mixtape, ...updatedMixtape });
    await mixtapeService.updateMixtape(id, updatedMixtape);
  };

  useEffect(() => {
    setIsLoading(true);
    getMixtape();
  }, [id]);

  return [mixtape, getMixtape, updateMixtape, isLoading];
}

export default useMixtape;
