import React, { Component } from "react";
import Login from "./app/user-pages/Login";
import Register from "./app/user-pages/Register";
import Error404 from "./app/error-pages/Error404";
import LockScreen from "./app/user-pages/Lockscreen";
import Navbar from "./app/shared/Navbar";
import TestSet from "./app/general-pages/TestSet";
import TestPage from "./app/general-pages/TestPage";
import ProjectPage from "./app/general-pages/ProjectPage";
import { Switch, Route } from "react-router-dom";
import "./app/App.scss";

class Appl extends Component {
  render() {
    return (
      <Switch>
        <div className="content-wrapper">
          <Route exact path="/">
            <LockScreen />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/404" component={Error404} />
          <Route path="/home">
            <Navbar />
          </Route>
          <Route path="/testcase">
            <Navbar />
            <TestPage />
          </Route>

          <Route path="/testset">
            <Navbar />
            <TestSet />
          </Route>
          <Route path="/projectpage">
            <Navbar />
            <ProjectPage />
          </Route>
          <Route path="/viewcases"></Route>
          <Route path="/issues"></Route>
        </div>
      </Switch>
    );
  }
}
export default Appl;
