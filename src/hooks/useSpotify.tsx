import React, { useEffect, useReducer, useRef, useState } from "react";
import spotifyService from "../services/spotifyService/spotifyService";
import { Player } from "./useSpotifyOld";

function useSpotifyNew() {
  const player = useRef(null as Player | null);
  const [state, action] = useReducer(reducer, InitialState);

  const initializeSpotify = async () => {
    // Check if user has a previous refresh_token.
    const refreshToken = localStorage.getItem("spotify_refresh_token");

    // User has a previous refreshToken.
    // Retrieve a new accessToken and initialize player.
    if (refreshToken) {
      const accessToken = await spotifyService.auth.refreshAccessToken(
        refreshToken
      );

      // Initialize spotify api with new access token.
      spotifyService.api.init(accessToken);

      // User is now authorized to make API calls.
      action({ type: "userAuthorized", payload: { accessToken } });

      const device_id = await initalizePlayer(accessToken);

      // The spotify web player is now ready.
      action({ type: "playerReady", payload: { device_id } });
    }
  };

  const initalizePlayer = async (accessToken: string): Promise<string> => {
    // Create instance of new Spotify player.
    player.current = new (window as any).Spotify.Player({
      name: "mujik",
      getOAuthToken: (cb: any) => {
        cb(accessToken);
      },
    });

    // Setup default listeners.
    const default_events = [
      "initialization_error",
      "authentication_error",
      "account_error",
      "playback_error",
      "not_ready",
    ];

    default_events.forEach((e) =>
      player.current!.addListener(e, ({ message }) => console.error(message))
    );

    player.current!.addListener("player_state_changed", (playerState) =>
      action({ type: "playerStateChanged", payload: { playerState } })
    );

    const player_id: string = await new Promise((resolve) => {
      player.current!.addListener("ready", ({ device_id }) => {
        resolve(device_id);
      });
    });

    return player_id;
  };

  useEffect(() => {
    (window as any).onSdkReady = () => initializeSpotify();
  });

  return {
    state,
    player,
    spotifyService,
  };
}

export default useSpotifyNew;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "userAuthorized":
      return {
        ...state,
        isAuthorized: true,
        accessToken: action.payload.accessToken,
      };
    case "playerReady":
      return {
        ...state,
        playerReady: true,
      };
    case "playerStateChanged":
      return {
        ...state,
        playerState: action.payload.playerState,
      };
  }
}

const InitialState: State = {
  isAuthorized: false,
  playerReady: false,
  deviceId: "",
  accessToken: "",
  playerState: {},
};

type State = {
  isAuthorized: boolean;
  playerReady: boolean;
  deviceId: string;
  accessToken: string;
  playerState: any;
};

interface Action {
  type: "userAuthorized" | "playerReady" | "playerStateChanged";
  payload: any;
}
