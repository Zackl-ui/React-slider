// Packages
import React from "react";
import ReactDOM from "react-dom";
import Analytics from "react-ga";
import "./index.css";
// Stuff
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// Data
import SETTINGS from "./config/settings";

// Init service worker
registerServiceWorker();

// Init Google Analytics
Analytics.initialize(SETTINGS.googleAnalyticsId);

// Render appliction
ReactDOM.render(<App />, document.getElementById("root"));

// WEBPACK FOOTER //
// ./src/index.js
