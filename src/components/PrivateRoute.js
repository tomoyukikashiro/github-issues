import React from 'react'
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route {...rest}>
      { user?.token ? (
        children
      ) : user && !user.token ? (
        <Redirect to="/settings/" />
      ) : <Redirect to="/login/" /> }
    </Route>
  );
}

export default PrivateRoute
