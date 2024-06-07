import { StrictMode } from "react";
// import * as ReactDOMClient from "react-dom/client";

var ReactDOM = require('react-dom/client');
//import App from "./App";
import AuthStateApp from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <AuthStateApp />
  </StrictMode>
);
