// Packages
import React from "react";
import Analytics from "react-ga";

export default function trackPage(WrappedComponent) {
  const HOC = (props) => {
    const page = props.location.pathname;
    Analytics.pageview(page);

    return <WrappedComponent {...props} />;
  };

  return HOC;
}

// WEBPACK FOOTER //
// ./src/utils/trackPage.js
