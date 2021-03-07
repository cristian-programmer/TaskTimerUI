import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dasboard from "./pages/dashboard";

const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dash" component={Dasboard} />
      <Route path="/signup" component={Register} />
    </Switch>
  );
};

export default Routers;
