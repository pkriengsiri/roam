import { useEffect, useState } from "react";
import Axios from "axios";
import "./sass/App.scss";
import Home from "./containers/Home/Home";
import EditUser from "./containers/EditUser/EditUser";
import Dashboard from "./containers/Dashboard/Dashboard";
import CreateTrip from "./containers/CreateTrip/CreateTrip";
import EditTrip from "./containers/EditTrip/EditTrip";
import SingleTrip from "./containers/SingleTrip/SingleTrip";
import CreateExpense from "./containers/CreateExpense/CreateExpense";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UserContext from "./contexts/UserContext";
import AlertContext from "./contexts/AlertContext";
import ExpenseContext from "./contexts/ExpenseContext";

function App() {
  const [userContext, setUserContext] = useState({
    email: "",
    id: "",
  });

  const [expenseContext, setExpenseContext] = useState({
    id: "",
  });

  const [alertContext, setAlertContext] = useState({
    display: false,
    theme: "",
    onDisplay: (display, theme) =>
      setAlertContext({ ...alertContext, display, theme }),
  });

  return (
    <UserContext.Provider value={{ userContext, setUserContext }}>
      <AlertContext.Provider value={alertContext}>
        <ExpenseContext.Provider value={expenseContext}>
          <div className="App">
            <Router>
              <Navbar
                setUserContext={setUserContext}
                userContext={userContext}
              />
              <main className="page">
                <Switch>
                  <Route exact path="/">
                    <Home setUserContext={setUserContext} />
                  </Route>
                  {/* <Route exact path="/user/:userId" component={Dashboard} /> */}
                  <Route
                    exact
                    path="/user/:userId/trips"
                    component={Dashboard}
                  />
                  <Route exact path="/user/:userId/edit" component={EditUser} />
                  <Route
                    exact
                    path="/user/:userId/trips/new"
                    component={CreateTrip}
                  />
                  <Route
                    exact
                    path="/user/:userId/trips/:tripId"
                    component={SingleTrip}
                  />
                  <Route
                    exact
                    path="/user/:userId/trips/:tripId/edit"
                    component={EditTrip}
                  />
                  <Route
                    exact
                    path="/user/:userId/trips/:tripId/expense"
                    component={CreateExpense}
                  />
                </Switch>
              </main>
              <Footer />
            </Router>
          </div>
        </ExpenseContext.Provider>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
