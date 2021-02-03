import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import api, { api as apiInstance } from "../services/api/apiService";
import jwt_decode from "jwt-decode";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    isLoggedIn();
  }, []);

  // Check if user is logged in.
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

  // Login User.
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

  // End User session.
  const logout = () => {
    localStorage.removeItem("token");
    delete apiInstance.defaults.headers["Authorization"];
    setIsAuthenticated(false);
  };

  const updateUser = async (u: User) => {
    const updatedUser = { ...user, ...u };
    setUser({ ...updatedUser });
    await api.user.UpdateUser(user.username, updatedUser);
  };

  const refreshUser = async () => {
    const refreshedUser = await api.user.GetUser(user.username);
    setUser(refreshedUser);
  };

  return {
    state: { isAuthenticated, isAuthenticating },
    actions: { login, logout, updateUser, refreshUser },
    user,
    api,
  };
}

export default useAuth;
