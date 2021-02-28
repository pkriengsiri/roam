import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
// import Loading from "./../components/Loading";

export default function PrivateRoute(props) {
  const { userContext, isLoading } = useContext(UserContext);
  console.log(userContext);

  const { component: Component, ...rest } = props;
  if (isLoading) {
    //   return <Loading/>
    return null;
  }
  if (userContext.userId) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }
  //redirect if there is no user
  return <Redirect to="/" />;
}
