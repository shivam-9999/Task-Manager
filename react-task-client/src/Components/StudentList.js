import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
//
// this component displays a list of tasks
function StudnetList(props) {
  let navigate = useNavigate();
  // declare the states of this component
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  //
  const apiUrl = "http://localhost:3000/studentsList";
  const fetchData = async () => {
    axios
      .get(apiUrl)
      .then((result) => {
        console.log("result.data:", result.data);
        setData(result.data);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log("error in fetchData:", error);
        setListError(true);
      });
  };

  // retrieve all tasks
  useEffect(() => {
    // load the tasks
    fetchData();
  }, []);
  //
  const deleteTask = (item) => {
    setShowLoading(true);
    const id = item._id;
    const task = {
      studentNumber: item.studentNumber,
      password: item.password,
      firstName: item.firstName,
      startDate: item.startDate,
      lastName: item.lastName,
      address: item.address,
      city: item.city,
      phoneNumber: item.phoneNumber,
      email: item.email,
      program: item.program,
      dateOfBirth: item.dateOfBirth,
      nationality: item.nationality,
    };
    console.log("task to delete:", task);
    //
    const apiUrlDelete = "http://localhost:3000/studentsList/" + id;
    console.log("url:", apiUrlDelete);
    //
    axios
      .delete(apiUrlDelete, task)
      .then((results) => {
        setShowLoading(false);
        console.log("deleted document:", results.data);
        //refresh the list
        fetchData();
        //navigate('/list')
      })
      .catch((error) => setShowLoading(false));
  };
  //show the task
  const showDetail = (id) => {
    navigate("/show/" + id);
  };
  //
  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}

      <h2>See all your tasks here:</h2>
      <ListGroup>
        <Table>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.studentNumber}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.password}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.firstName}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.lastName}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.address}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.city}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.phoneNumber}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.email}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.program}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.dateOfBirth}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <ListGroup.Item
                    key={idx}
                    action
                    onClick={() => {
                      showDetail(item._id);
                    }}
                  >
                    {item.nationality}{" "}
                  </ListGroup.Item>
                </td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => {
                      deleteTask(item);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ListGroup>
    </div>
  );
}
//

export default StudnetList;
