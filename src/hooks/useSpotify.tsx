import { useEffect, useReducer, useRef } from "react";
import spotifyService from "../services/spotifyService/spotifyService";

function useSpotify() {
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

      const deviceId = await initalizePlayer(accessToken);

      // The spotify web player is now ready.
      action({ type: "playerReady", payload: { deviceId } });
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
        console.log("player ready...");
        resolve(device_id);
      });

      player.current!.connect();
    });

    console.log(player_id);

    return player_id;
  };

  const handleUserAuthorizedApp = async (code: string) => {
    await spotifyService.auth.getInitialAccessToken(code);
    initializeSpotify();
  };

  const logout = async () => {
    player.current?.disconnect();

    localStorage.removeItem("spotify_refresh_token");
    localStorage.removeItem("spotify_access_token");
  };

  useEffect(() => {
    (window as any).onSdkReady.push(() => initializeSpotify());
  }, []);

  return {
    state,
    player,
    spotifyService,
    handleUserAuthorizedApp,
    logout,
  };
}

export default useSpotify;

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
        deviceId: action.payload.deviceId,
      };
    case "playerStateChanged":
      return {
        ...state,
        playerState: action.payload.playerState,
      };
    case "logout":
      return {
        ...state,
        isAuthorized: false,
        accessToken: "",
        playerReady: false,
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
  type: "userAuthorized" | "logout" | "playerReady" | "playerStateChanged";
  payload: any;
}
export type Player = {
  device_id: string;
  addListener: (event: string, callback: (state: any) => any) => void;
  connect: () => void;
  disconnect: () => void;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  getVolume: () => any;
  setVolume: (value: any) => any;
  seek: (value: any) => any;
};
