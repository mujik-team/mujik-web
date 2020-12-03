import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import * as mixtapeService from "../services/mixtapeService";
import { getImageToBase64 } from "../services/util";

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

  const sortSongsBy = (option: any) => {
    switch (option) {
      case "title" : {
        const songsToSort = mixtape.songs
        console.log(songsToSort)
        songsToSort.sort((a : any,b : any) => ( a.name.toLowerCase() > b.name.toLowerCase() ) ? 1 : -1)
        mixtape.songs = [...songsToSort]
        break
      }
      case "artist" : {
        console.log('sort by artist')
        const songsToSort = mixtape.songs
        songsToSort.sort((a : any,b : any) => ( a.artists[0].name.toLowerCase() > b.artists[0].name.toLowerCase() ) ? 1 : -1)
        mixtape.songs = [...songsToSort]
        break
      }
      case "album" : {
        console.log('sort by album')
        const songsToSort = mixtape.songs
        songsToSort.sort((a : any,b : any) => ( a.album.name.toLowerCase() > b.album.name.toLowerCase() ) ? 1 : -1)
        mixtape.songs = [...songsToSort]
        break
      }
      case "releaseDate" : {
          console.log('sort by releaseDate')
          const songsToSort = mixtape.songs 
          songsToSort.sort((a : any,b : any) => ( a.album.release_date > b.album.release_date ) ? 1 : -1)
          mixtape.songs = [...songsToSort]
          break
      }
      case "duration" : {
          console.log('sort by duration')
          const songsToSort = mixtape.songs
          songsToSort.sort((a : any,b : any) => ( a.duration_ms > b.duration_ms ) ? 1 : -1)
          mixtape.songs = [...songsToSort]
          break
      }
    }
  }

  // This effect retrieves the mixtape's cover image.
  useEffect(() => {
    if (mixtape._id) {
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
    getMixtape,
    updateMixtape,
    setMixtape,
    isLoading,
    sortSongsBy,
  };
}

export default useMixtape;
