import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function useUser(username: string) {
  const [user, setUser] = useState(null as any);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    const { data } = await api.get(`/user/${username}`);
    setUser(data.payload.user);
    setIsLoading(false);
  };

  const updateUser = async (updatedUser: any) => {
    const { data } = await api.put(`/user/${username}`, { user: updatedUser });
    setUser(data.payload.user);
    setIsLoading(false);
  };

  // Retrieve user.
  useEffect(() => {
    getUser();
    setIsLoading(true);
  }, [username]);

  return [user, getUser, setUser, updateUser, isLoading];
}

export default useUser;
