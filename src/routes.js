import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Dasboard from "./pages/dashboard";

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dash" component={Dasboard} />
    </Switch>
  );
};

export default Routers;
