import React, { useEffect, useState } from "react";
import * as spotifyService from "../services/spotify";

export type Player = {
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
        // console.log(state);
        setPlayerState(state);
      });

      // Ready
      newPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
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
      setIsAuthorized(true);
      setAccessToken(newToken);
      return newToken;
    } else {
      return null;
    }
  };

  const logout = async () => {
    player.disconnect();
    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_access_token");
    setIsAuthorized(false);
  };

  useEffect(() => {
    if (spotifySDKReady && isAuthorized) {
      initPlayer();
    }
  }, [spotifySDKReady]);

  useEffect(() => {
    (window as any).onReadySubscribers.push(() => setSpotifyReady(true));
    if (localStorage.getItem("spotify_refresh_token")) {
      setIsAuthorized(true);
    }
  }, []);

  const actions: SpotifyActions = {
    initPlayer,
    requestAuthorization: spotifyService.authorize,
    logout,
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
