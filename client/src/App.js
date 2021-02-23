import { useEffect } from "react";
import Axios from "axios";
import "./sass/App.scss";
import Home from "./containers/Home/Home";
import EditUser from "./containers/EditUser/EditUser";
import Dashboard from "./containers/Dashboard/Dashboard";
import CreateTrip from "./containers/CreateTrip/CreateTrip";
import EditTriip from "./containers/EditTrip/EditTrip;

function App() {
  useEffect(() => {
    Axios.get("/api/config")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="title">Bulma</h1>
      <p className="subtitle">
        Modern CSS framework based on{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox">
          Flexbox
        </a>
      </p>

      <div className="field">
        <div className="control">
          <input className="input" type="text" placeholder="Input" />
        </div>
      </div>

      <div className="field">
        <p className="control">
          <span className="select">
            <select>
              <option>Select dropdown</option>
            </select>
          </span>
        </p>
      </div>

      <div className="buttons">
        <a className="button is-primary">Primary</a>
        <a className="button is-link">Link</a>
      </div>
    </>
  );
}

export default App;
