import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import api, { api as apiInstance } from "../services/api/apiService";
import jwt_decode from "jwt-decode";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState({} as User);

  // Check if user is logged in.
  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    setIsAuthenticating(true);

    // Check if the JWT token is expired.
    const token = localStorage.getItem("token");

    if (token !== null) {
      apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

      const { username } = jwt_decode(token) as any;
      setUser(await api.user.GetUser(username));
    }

    setIsAuthenticated(token !== null);
    setIsAuthenticating(false);
  };

  const login = async (u: string, p: string) => {
    try {
      setIsAuthenticating(true);
      const token = await api.auth.Login(u, p);

      localStorage.setItem("token", token);
      apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(await api.user.GetUser(u));

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
    user,
  };
}

export default useAuth;
