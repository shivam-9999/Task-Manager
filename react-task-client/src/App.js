import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";
import StudentList from "./Components/StudentList";
import CreateStudent from "./Components/CreateStudent";
import CreateCourse from "./Components/CreateCourse";
import CourseList from "./Components/CourseList";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // const Navigate = useNavigate();
  function handleLogin(token) {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <Router>
      {" "}
      {/* add Router component here */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For Tasks App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/course">
                    Create Course
                  </Nav.Link>
                  <Nav.Link as={Link} to="/courseList">
                    Course List
                  </Nav.Link>
                  <Nav.Link as={Link} to="/students">
                    Create Student
                  </Nav.Link>
                  <Nav.Link as={Link} to="/studentsList">
                    Students List
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav style={{ marginLeft: "auto" }}>
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/register">
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "50px", height: "100%" }}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />

          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/course" element={<CreateCourse />} />
              <Route path="/courseList" element={<CourseList />} />
              <Route path="/students" element={<CreateStudent />} />
              <Route path="/studentsList" element={<StudentList />} />
            </>
          ) : (
            <Route path="/" element={<Home />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
