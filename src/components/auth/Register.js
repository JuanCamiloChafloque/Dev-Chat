import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  Grid,
  Form,
  Segment,
  Header,
  Message,
  Button,
  Icon,
} from "semantic-ui-react";

const Register = () => {
  const auth = getAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const registerHandler = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoading(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setErrors([err]);
        });
    }
  };

  const isFormValid = () => {
    if (isFormEmpty()) {
      const error = { message: "Fill in all fields" };
      setErrors([error]);
      return false;
    } else if (!isPasswordValid()) {
      const error = { message: "Password is invalid" };
      setErrors([error]);
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6 || confirmPassword < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const errorHandler = (input) => {
    return errors.some((error) => error.message.toLowerCase().includes(input))
      ? "error"
      : "";
  };

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form size="large" onSubmit={registerHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                type="text"
                value={username}
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                className={errorHandler("username")}
              ></Form.Input>
              <Form.Input
                fluid
                name="email"
                type="email"
                value={email}
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className={errorHandler("email")}
              ></Form.Input>
              <Form.Input
                fluid
                name="password"
                type="password"
                value={password}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className={errorHandler("password")}
              ></Form.Input>
              <Form.Input
                fluid
                name="confirmpassword"
                type="password"
                value={confirmPassword}
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errorHandler("password")}
              ></Form.Input>
              <Button
                className={loading ? "loading" : ""}
                disabled={loading}
                color="orange"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 &&
            errors.map((err, i) => (
              <Message key={i} error>
                <h3>Error</h3>
                <p>{err.message}</p>
              </Message>
            ))}
          <Message>
            Already a user? <Link to="/login">Sign in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Register;
