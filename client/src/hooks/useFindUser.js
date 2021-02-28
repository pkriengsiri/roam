// Dependencies
import { useState, useEffect } from "react";
import API from "../utils/API";

export default function useFindUser() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await API.relogin();
      jwt.verify(data.token, process.env.REACT_APP_SECRET, (err, data) => {
        if (err) {
          console.log(err);
          setLoading(false);
        } else {
          setEmail(data.email);
          setUserId(data._id);
          setLoading(false);
          // setUserContext({ userId: data._id, email: data.email });
        }
      });
      Axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return {
    user,
    isLoading,
  };
}
