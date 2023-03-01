import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./login.css";
//
import { useNavigate } from 'react-router-dom';

//
function CreateTask(props) {
  let navigate = useNavigate()
  let myCurrentDate = new Date()
  let date = myCurrentDate.getDate();
  //
  const [task, setTask] = useState({ _id: '', taskId: '', taskName: '', taskDescription: '', 
                startDate: date, endDate: date, owner: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/tasks";
    //
  const saveTask = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { taskId: task.taskId, taskName: task.taskName, 
      taskDescription: task.taskDescription,startDate: task.startDate, 
      endDate: task.startDate, owner: task.owner };
      //use promises
      console.log('cT',data)
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  // handles onChange event
  const onChange = (e) => {
    e.persist();
    setTask({...task, [e.target.name]: e.target.value});
  }

  return (
    <div className='login'>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={saveTask}>
          <Form.Group>
            <Form.Label> Task Id:</Form.Label>
            <Form.Control type="text" name="taskId" id="taskId" placeholder="Enter taskId" value={task.taskId} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Task Name</Form.Label>
            <Form.Control type="text" name="taskName" id="taskName" placeholder="Enter task name" value={task.taskName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Task Description</Form.Label>
            <Form.Control type="text" name="taskDescription" id="taskDescription" rows="3" placeholder="Enter task description" value={task.taskDescription} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="startDate" id="startDate" placeholder="Enter start date" value={task.startDate} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" name="endDate" id="endDate" placeholder="Enter end date" value={task.endDate} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control type="text" name="owner" id="owner" placeholder="Enter owner" value={task.owner} onChange={onChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>

        </Form>
    </div>
  );
}

export default CreateTask;
