import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Grid,
  Form,
  Segment,
  Header,
  Message,
  Button,
  Icon,
} from "semantic-ui-react";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [auth, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoading(false);
        setErrors([]);
        console.log(user);
      } catch (err) {
        setLoading(false);
        setErrors([err]);
      }
    }
  };

  const isFormValid = () => {
    return email.length && password.length;
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
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="violet" />
            Login to DevChat
          </Header>
          <Form size="large" onSubmit={loginHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                type="email"
                value={email}
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className={errorHandler("user")}
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
              <Button
                className={loading ? "loading" : ""}
                disabled={loading}
                color="violet"
                fluid
                size="large"
              >
                Log In
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
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
