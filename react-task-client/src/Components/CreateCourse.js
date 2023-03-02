import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
//
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  let navigate = useNavigate();
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/course";

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoading(true);
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
    };
    //use promises
    console.log("studData", data);
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate("/courseList");
      })
      .catch((error) => setShowLoading(false));
    // Send form data to backend or handle form data as needed
    console.log(course);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevState) => ({
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
        <Form.Group controlId="courseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            placeholder="Enter course code"
            value={course.courseCode}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            placeholder="Enter course name"
            value={course.courseName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="section">
          <Form.Label>Section</Form.Label>
          <Form.Control
            type="text"
            name="section"
            placeholder="Enter section"
            value={course.section}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="semester">
          <Form.Label>Semester</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            placeholder="Enter semester"
            value={course.semester}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default CreateCourse;
