import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./firebase";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Spinner from "./components/utils/Spinner";

const Root = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;

  return loading ? (
    <Spinner />
  ) : (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
