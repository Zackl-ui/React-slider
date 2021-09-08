// Packages
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
// Containers
import Cards from "./containers/Cards";
// Utils
import trackPage from "./utils/trackPage";

const InnerApp = () => (
  <Switch>
    <Route exact path="/" component={Cards} />
    <Redirect from="*" to="/" />
  </Switch>
);

const App = () => (
  <Router>
    <Route component={trackPage(InnerApp)} />
  </Router>
);

export default App;

// WEBPACK FOOTER //
// ./src/App.js
