import { useEffect, useState, useContext } from "react";
import "./sass/App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import EditUser from "./containers/EditUser/EditUser";
import Dashboard from "./containers/Dashboard/Dashboard";
import CreateTrip from "./containers/CreateTrip/CreateTrip";
import EditTrip from "./containers/EditTrip/EditTrip";
import SingleTrip from "./containers/SingleTrip/SingleTrip";
import CreateExpense from "./containers/CreateExpense/CreateExpense";
import EditExpense from "./containers/EditExpense/EditExpense";
import AllExpenses from "./containers/AllExpenses/AllExpenses";
import Footer from "./components/Footer/Footer";
import "./App.css";
import UserContext from "./contexts/UserContext";
import AlertContext from "./contexts/AlertContext";
import ExpenseContext from "./contexts/ExpenseContext";
import useFindUser from "./hooks/useFindUser";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const { userContext, setUserContext, isLoading } = useFindUser();

  const [expenseContext, setExpenseContext] = useState({
    id: "",
  });

  const [alertContext, setAlertContext] = useState({
    display: false,
    theme: "",
    onDisplay: (display, theme) =>
      setAlertContext({ ...alertContext, display, theme }),
  });

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await API.relogin();
  //     jwt.verify(data.token, process.env.REACT_APP_SECRET, (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         setUserContext({ userId: data._id, email: data.email });
  //       }
  //     });
  //     Axios.defaults.headers.post["X-CSRF-Token"] = data.csrfToken;
  //   };
  //   getCsrfToken();
  // }, []);

  return (
    <UserContext.Provider value={{ userContext, setUserContext, isLoading }}>
      <AlertContext.Provider value={alertContext}>
        <div className="App">
          <Router>
            <Navbar setUserContext={setUserContext} userContext={userContext} />
            <main className="page">
              <Switch>
                <Route exact path="/">
                  <Home setUserContext={setUserContext} />
                </Route>
                {/* <Route exact path="/user/:userId" component={Dashboard} /> */}
                <PrivateRoute
                  exact
                  path="/user/:userId/trips"
                  component={Dashboard}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/edit"
                  component={EditUser}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/trips/new"
                  component={CreateTrip}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/trips/:tripId"
                  component={SingleTrip}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/trips/:tripId/edit"
                  component={EditTrip}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/trips/:tripId/expenses"
                  component={CreateExpense}
                />
                <PrivateRoute
                  exact
                  path="/user/:userId/trips/:tripId/expenses"
                  component={AllExpenses}
                />
                <PrivateRoute
                  path="/user/:userId/trips/:tripId/expenses/:expenseId/edit"
                  component={EditExpense}
                />
              </Switch>
            </main>
            <Footer />
          </Router>
        </div>
      </AlertContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
