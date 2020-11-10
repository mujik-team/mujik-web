import React, { useEffect, useState } from "react";
import { AuthState } from "../services/auth/types";
import * as authService from "../services/auth/authService";
import { getUser } from "../services/user/userService";

function useAuth() {
  const login = async (u: string, p: string) => {
    const user = await authService.login(u, p);

    if (user) {
      setAuthState({ ...authState, currentUser: user, isLoggedIn: true });
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
