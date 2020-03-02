import React from "react";
import AdminPage from "../container/AdminPage/AdminPage";
// import UserPage from "../container/UserPage/UserPage";
import App from "../App";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <App />
        </Route>
        <Route path="/home">
          <AdminPage />
        </Route>
      </Switch>
    </Router>
  );
};
