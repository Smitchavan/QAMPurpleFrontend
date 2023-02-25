import React, { Component } from "react";
import Login from "./app/user-pages/Login";
import Register from "./app/user-pages/Register";
//import Error404 from "./app/error-pages/Error404";
import LockScreen from "./app/user-pages/Lockscreen";
import Navbar from "./app/shared/Navbar";
import TestSet from "./app/general-pages/TestSet";
import TestPage from "./app/general-pages/TestPage";
import { Switch, Route } from "react-router-dom";
import "./app/App.scss";
import Forgotpassword from "./app/user-pages/Forgotpassword";
import Testview from "./app/general-pages/viewpages/Testview";
import Testsetview from "./app/general-pages/viewpages/Testsetview";
import Runs from "./app/general-pages/Runs";
class Appl extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/">
          <div className="content-wrapper">
            <LockScreen />
          </div>
        </Route>
        <Route exact path="/register">
          <div className="content-wrapper">
            <Register />
          </div>
        </Route>
        <Route exact path="/login">
          <div className="content-wrapper">
            <Login />
          </div>
        </Route>
        {/* <Route path="*" exact={true} component={Error404} /> */}
        <Route exact path="/home">
          <Navbar />
        </Route>
        <Route exact path="/testcase">
          <div className="content-wrapper">
            <Navbar />
            <TestPage />
          </div>
        </Route>

        <Route exact path="/testset">
          <div className="content-wrapper">
            <Navbar />
            <TestSet />
          </div>
        </Route>

        <Route path="/forgotpassword">
          <div className="content-wrapper">
            <Forgotpassword />
          </div>
        </Route>
        <Route path="/viewcases">
          <div className="content-wrapper">
            <Testview />
          </div>
        </Route>
        <Route path="/viewtestsets">
          <div className="content-wrapper">
            <Testsetview />
          </div>
        </Route>
        <Route path="/runs">
          <div className="content-wrapper">
            <Runs />
          </div>
        </Route>
      </Switch>
    );
  }
}
export default Appl;
