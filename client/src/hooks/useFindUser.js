// Dependencies
import { useState, useEffect } from "react";
import API from "../utils/API";
import jwt from "jsonwebtoken";
import Axios from "axios";

export default function useFindUser() {
  const [userContext, setUserContext] = useState({
    email: "",
    id: "",
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await API.relogin();
      jwt.verify(data.token, process.env.REACT_APP_SECRET, (err, data) => {
        if (err) {
          console.log(err);
          setLoading(false);
        } else {
          setUserContext({ userId: data._id, email: data.email });
          setLoading(false);
          // setUserContext({ userId: data._id, email: data.email });
        }
      });
      Axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();

    // async function findUser() {
    //   try {
    //     let res = API.relogin();
    //     setUser(res.data.currentUser);
    //     setLoading(false);
    //   } catch (err) {
    //     setLoading(false);
    //   }
    // }
    // findUser();
  }, []);

  return {
    userContext,
    setUserContext,
    isLoading,
  };
}
