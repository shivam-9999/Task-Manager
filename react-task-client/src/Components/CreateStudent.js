import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
//
import { useNavigate } from "react-router-dom";

//
function CreateStudent() {
  let navigate = useNavigate();
  const [Student, setStudent] = useState({
    studentNumber: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: "",
    program: "",
    dateOfBirth: "",
    nationality: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/students";

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoading(true);
    const data = {
      studentNumber: Student.studentNumber,
      password: Student.password,
      firstName: Student.firstName,
      lastName: Student.lastName,
      address: Student.address,
      city: Student.city,
      phoneNumber: Student.phoneNumber,
      email: Student.email,
      program: Student.program,
      dateOfBirth: Student.dateOfBirth,
      nationality: Student.nationality,
    };
    //use promises
    console.log("studData", data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate("/studentsList");
      })
      .catch((error) => setShowLoading(false));
    // Send form data to backend or handle form data as needed
    console.log(Student);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="studentNumber">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="text"
            name="studentNumber"
            value={Student.studentNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={Student.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={Student.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={Student.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={Student.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={Student.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={Student.phoneNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={Student.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="program">
          <Form.Label>Program</Form.Label>
          <Form.Control
            type="text"
            name="program"
            value={Student.program}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={Student.dateOfBirth}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="nationality">
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            type="text"
            name="nationality"
            value={Student.nationality}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default CreateStudent;
