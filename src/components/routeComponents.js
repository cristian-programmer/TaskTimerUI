import React from "react";
import { Switch, Route } from "react-router-dom";
import Task from "./task";
import Project from "./project";
const RouterDashboard = () => {
  return (
    <Switch>
      <Route exact path="/dash" component={Task} />
      <Route path="/dash/projects" component={Project} />
    </Switch>
  );
};

export default RouterDashboard;
