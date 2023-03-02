import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Routes,
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed:
//    npm install react-bootstrap bootstrap
//
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
//
function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">React Client For Tasks App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="course" element={<CreateCourse />} />
          <Route path="courseList" element={<CourseList />} />
          <Route path="students" element={<CreateStudent />} />
          <Route path="studentsList" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
}
//
export default App;
