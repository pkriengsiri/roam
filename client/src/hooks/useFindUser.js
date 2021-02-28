// Dependencies
import { useEffect, useState } from "react";
import API from "../utils/API";
import jwt from "jsonwebtoken";
import Axios from "axios";

const useFindUser = () => {
  const [isLoading, setLoading] = useState(true);
  const [userContext, setUserContext] = useState({});

  useEffect(() => {
    const getCsrfToken = async () => {
      API.relogin()
        .then((response) => {
          jwt.verify(response.data.token, process.env.REACT_APP_SECRET, (err, data) => {
            if (err) {
              console.log(err);
              setLoading(false);
            } else {
              setUserContext({ userId: data._id, email: data.email });
              console.log(userContext);
              setLoading(false);
              // setUserContext({ userId: data._id, email: data.email });
            }
          });
          Axios.defaults.headers.post["X-CSRF-Token"] = response.data.csrfToken;
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    console.log(userContext);
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
};

export default useFindUser;
