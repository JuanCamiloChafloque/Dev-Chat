import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import app from "./firebase";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const Root = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
