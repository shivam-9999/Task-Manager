import React, { useEffect, useState } from "react";
import { Form, Button, Alert, Card, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    errorMsg: "",
    success: false,
  });
  const navigate = useNavigate();
  const { name, email, password, errorMsg, success } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      const response = await axios.post("/register", formData);
      setFormData({ success: true });
      navigate("/login");
      console.log(response.data);
      // Redirect to success page or display success message
    } catch (error) {
      console.log(error.response.data);
      setFormData({
        errorMsg: error.response.data.message,
      });
    }
  };

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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder="Password"
              minLength={4}
              required
            />
          </Form.Group>
          {/* {success && <Alert variant="danger">Registration successful</Alert>} */}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
