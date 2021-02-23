import { useEffect } from "react";
import Axios from "axios";
import "./sass/App.scss";
import Home from "./containers/Home/Home";
import EditUser from "./containers/EditUser/EditUser";
import Dashboard from "./containers/Dashboard/Dashboard";
import CreateTrip from "./containers/CreateTrip/CreateTrip";
import EditTrip from "./containers/EditTrip/EditTrip";
import SingleTrip from "./containers/SingleTrip/SingleTrip";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

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
    <div className="App">
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
        <Route exact path="/user/:id/edit" component={EditUser} />
        <Route exact path="/trips/new" component={CreateTrip} />
        <Route exact path="/trip/:id" component={SingleTrip} />
        <Route exact path="/trips/:id/edit" component={EditTrip} />
      </Switch>
      <Footer/>
    </Router>
  </div>
  );
}

export default App;
