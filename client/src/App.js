import { useEffect, useState } from "react";
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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UserContext from "./contexts/UserContext";

function App() {


  return (
    <div className="App">
      <Router>
        <NavBar />
        <main className="page">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard/:id" component={Dashboard} />
            <Route exact path="/user/:id/edit" component={EditUser} />
            <Route exact path="/trips/new" component={CreateTrip} />
            <Route exact path="/trip/:id" component={SingleTrip} />
            <Route exact path="/trips/:id/edit" component={EditTrip} />
          </Switch>
        </main>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
