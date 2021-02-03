import React, { useEffect, useState } from "react";
import { User } from "../model/User";
import api from "../services/api/apiService";

function useUser(username: string) {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const user = await api.user.GetUser(username);
      setUser(user);
    } catch (err) {}
    setIsLoading(false);
  };

  // Retrieve user.
  useEffect(() => {
    getUser();
  }, [username]);

  return {
    user,
    isLoading,
  };
}

export default useUser;
