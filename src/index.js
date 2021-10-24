import React from "react";
import ReactDOM from "react-dom";

import { Router } from "react-router";
import { history } from "./utils/useHistory";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  // uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  uri: "https://graphql-pokeapi.graphcdn.app",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
