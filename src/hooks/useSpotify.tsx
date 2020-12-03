import React, { useEffect, useState } from "react";
import * as spotifyService from "../services/spotifyService";

export type Player = {
  device_id: string;
  addListener: (event: string, callback: (state: any) => any) => void;
  connect: () => void;
  disconnect: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
};

type SpotifyActions = {
  initPlayer: () => void;
  requestAuthorization: () => Promise<void>;
  playSong: (uris: string[]) => Promise<void>;
  search: (query: string) => Promise<any>;
  getSeveralSongs: (ids: string[]) => Promise<any>;
  logout: () => void;
};

export type SpotifyState = {
  isAuthorized: boolean;
  spotifySDKReady: boolean;
  player: Player;
  playerState: any;
  actions: SpotifyActions;
};

function useSpotify() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [player, setPlayer] = useState({} as Player);
  const [playerState, setPlayerState] = useState(null);
  const [spotifySDKReady, setSpotifyReady] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  const initPlayer = async () => {
    const accessToken = await refreshAccessToken();

    if (accessToken) {
      console.log("Initalizing Spotify Web Player.");

      const newPlayer: Player = new (window as any).Spotify.Player({
        name: "mujik",
        getOAuthToken: (cb: any) => {
          cb(accessToken);
        },
      });

      setPlayer(newPlayer);

      // Error handling
      newPlayer.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });
      newPlayer.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });
      newPlayer.addListener("account_error", ({ message }) => {
        console.error(message);
      });
      newPlayer.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      newPlayer.addListener("player_state_changed", (state) => {
        console.log(state);
        setPlayerState(state);
      });

      // Ready
      newPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        newPlayer.device_id = device_id;
      });

      // Not Ready
      newPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      newPlayer.connect();

      return newPlayer;
    } else {
      console.log("Can't initalize Spotify player. User is not authorized.");
    }
  };

  const refreshAccessToken = async () => {
    const refresh_token = localStorage.getItem("spotify_refresh_token");
    if (refresh_token) {
      const newToken = await spotifyService.refreshAccessToken(refresh_token);
      setAccessToken(newToken);
      setIsAuthorized(true);
      return newToken;
    } else {
      return null;
    }
  };

  const logout = async () => {
    if (player?.disconnect) {
      player.disconnect();
    }
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_access_token");
    setIsAuthorized(false);
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    if (spotifySDKReady && refreshToken) {
      initPlayer();
    }
  }, [spotifySDKReady]);

  useEffect(() => {
    (window as any).onReadySubscribers.push(() => setSpotifyReady(true));
  }, []);

  const actions: SpotifyActions = {
    initPlayer,
    requestAuthorization: spotifyService.authorize,
    logout,
    playSong: (uris: string[]) =>
      spotifyService.playSong(accessToken, player.device_id, uris),
    search: async (q) => {
      const params = {
        q,
        type: "track",
        market: "US",
      };

      return await spotifyService.search(accessToken, params);
    },
    getSeveralSongs: (ids) => spotifyService.getSeveralSongs(accessToken, ids),
  };

  const spotifyState: SpotifyState = {
    isAuthorized,
    spotifySDKReady,
    player,
    playerState,
    actions,
  };

  return [spotifyState];
}

export default useSpotify;
