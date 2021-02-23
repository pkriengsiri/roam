import { useEffect } from "react";
import Axios from "axios";

function App() {
  useEffect(() => {
    Axios.get("/api/config")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <h1>Hello World</h1>
  );
}

export default App;
