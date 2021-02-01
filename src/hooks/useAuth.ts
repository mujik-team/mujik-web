import React, { useEffect, useRef, useState } from "react";
import { User } from "../model/User";
import api, { api as apiInstance } from "../services/api/apiService";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const user = useRef({} as User);

  // Check if user is logged in.
  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    setIsAuthenticating(true);

    // Check if the JWT token is expired.
    const token = localStorage.getItem("token");
    apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

    setIsAuthenticated(token !== null);
    setIsAuthenticating(false);
  };

  const login = async (u: string, p: string) => {
    try {
      setIsAuthenticating(true);
      const token = await api.auth.Login(u, p);

      localStorage.setItem("token", token);
      apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

      user.current = await api.user.GetUser(u);

      setIsAuthenticated(true);
    } catch (err) {
      console.error(err);
    }

    setIsAuthenticating(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete apiInstance.defaults.headers["Authorization"];
    setIsAuthenticated(false);
  };

  return {
    state: { isAuthenticated, isAuthenticating },
    actions: { login, logout },
    user: user.current,
  };
}

export default useAuth;
