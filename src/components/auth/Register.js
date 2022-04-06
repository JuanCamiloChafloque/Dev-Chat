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
import { register } from "../../actions/userActions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  useEffect(() => {
    if (userInfo || userInfoLogin) {
      navigate("/");
    }
  }, [userInfo, navigate, userInfoLogin]);

  const registerHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (isFormValid()) {
      dispatch(register(username, email, password));
      navigate("/login");
    }
  };

  const isFormValid = () => {
    if (isFormEmpty()) {
      setMessage("Fill in all fields");
      return false;
    } else if (!isPasswordValid()) {
      setMessage("Password is invalid");
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

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
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
              <Form.Input
                fluid
                name="confirmpassword"
                type="password"
                value={confirmPassword}
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            Already a user? <Link to="/login">Sign in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Register;
