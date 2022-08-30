import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import "antd/dist/antd.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
