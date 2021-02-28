// Dependencies
import { useState, useEffect } from "react";
import API from "../utils/API";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      try {
        let res = API.relogin();
        setUser(res.data.currentUser);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    findUser();
  }, []);

  return {
    user,
    isLoading,
  };
}
