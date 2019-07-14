import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import app from "routes/app.jsx";
import LoadingPage from  "./components/LoadingPage/LoadingPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

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
