import React, { useState } from "react";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Make POST request to server
    axios
      .post("/login", { email, password })
      .then((response) => {
        console.log(response);
        const { token } = response.data;
        localStorage.setItem("token", token);
        handleLogin(token);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(error.response.data.message);
      });
  };
  const gotoSignUpPage = () => navigate("/register");

  return (
    <Container>
      <Card
        style={{
          color: "blue",
          padding: "70px",
          display: "flex",
          width: "45rem",
          margin: "auto",
          alignItems: "center",
          background: "aliceblue",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          style={{ display: "grid", justifyContent: "center" }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Button variant="primary" type="submit">
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <span
              className="link"
              style={{ color: "green" }}
              onClick={gotoSignUpPage}
            >
              Sign up
            </span>
          </p>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
