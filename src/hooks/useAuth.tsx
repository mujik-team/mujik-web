import React, { useEffect, useState } from "react";
import * as authService from "../services/authService";
import { getUser } from "../services/userService";
import { initSpotifyWebPlayer } from "../services/spotifyService";

export type AuthState = {
  isLoggedIn: boolean;
  currentUser?: any;
  update(): any;
  login: (u: string, p: string) => any;
  logout: () => any;
};

function useAuth() {
  const login = async (u: string, p: string) => {
    const user = await authService.login(u, p);

    if (user) {
      setAuthState({ ...authState, currentUser: user, isLoggedIn: true });
      initSpotifyWebPlayer();
    }
  };

  const update = async () => {
    const user = await getUser(localStorage.getItem("username")!);
    setAuthState({ ...authState, currentUser: user, isLoggedIn: true });
  };

  const logout = async () => {
    await authService.logout();
    setAuthState({ ...authState, currentUser: null, isLoggedIn: false });
  };

  // Enable auto-login
  useEffect(() => {
    if (authService.checkIfLoggedIn()) {
      login(
        localStorage.getItem("username")!,
        localStorage.getItem("password")!
      );
    }
  }, []);

  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    currentUser: null,
    update,
    login,
    logout,
  } as AuthState);

  return [authState, setAuthState];
}

export default useAuth;
