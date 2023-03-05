import React from "react";
import { Card, Container } from "react-bootstrap";

// import  pic from "./../images/sample_test.png";
function Home(props) {
  return (
    <Container>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          color: "darkslategray",
        }}
      >
        Welcome To my application
      </h1>
      <h5
        style={{
          display: "flex",
          justifyContent: "center",
          color: "darkslategray",
          color: "#6e1f67",
        }}
      >
        Sign In to get access to functionalitities
      </h5>
    </Container>
  );
}
// withRouter will pass updated match, location, and history props
// to the wrapped component whenever it renders.
export default Home;
