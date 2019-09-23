import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import app from "../src/routes/app.jsx";
import "./assets/css/animate.min.css";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import "./assets/sass/markethub-style.css?v=1.2.0";
import LoadingPage from "./components/LoadingPage/LoadingPage.jsx";

ReactDOM.render(
  <HashRouter>
    <Switch>
      {
        sessionStorage.getItem("token") ? <LoadingPage/> : <Route path="/" name="Home" component={app}/>
      }
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
