import React from "react";
import AdminPage from "../container/AdminPage/AdminPage";
import App from "../App";
import Header from "../components/Header/Header";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
export const Routes = () => {
  return (
    <React.Fragment>
      <Header />
      <Router>
        <Switch>
          <Route path="/Home" component={App} />
          <Route path="/Admin" component={AdminPage} />
          <Redirect from="/" to="/Home" />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
