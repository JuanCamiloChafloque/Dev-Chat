import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Form,
  Segment,
  Header,
  Message,
  Button,
  Icon,
} from "semantic-ui-react";
import { login } from "../../actions/userActions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (isFormValid()) {
      dispatch(login(email, password));
    } else {
      setMessage("Authentication failed");
    }
  };

  const isFormValid = () => {
    return email.length && password.length;
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
          {message && (
            <Message error>
              <h3>Error</h3>
              <p>{message}</p>
            </Message>
          )}
          {error && (
            <Message error>
              <h3>Error</h3>
              <p>{error}</p>
            </Message>
          )}
          <Message>
            Don't have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Login;
