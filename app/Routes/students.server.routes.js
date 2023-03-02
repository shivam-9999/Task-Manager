//Load the index controller
const index = require("../Controllers/index.server.controller");
// Load the 'tasks' controller
const students = require("../Controllers/students.server.controller");

// Define the routes module' method
module.exports = function (app) {
  // Set up the 'students' base routes
  //
  //show the 'index' page if a GET request is made to root
  app.route("/").get(index.render);

  // a post request to /students will execute createTask method in students.server.controller
  app.route("/students").post(students.createStudent);

  // a get request to /students will execute list method in students.server.controller
  app.get("/studentsList", students.list); //go to http://localhost:3001/studentss to see the list
  //
  // Set up the 'studentss' parameterized routes
  app
    .route("/studentsList/:studentId")
    .get(students.read)
    .put(students.update)
    .delete(students.delete);
  // Set up the 'taskId' parameter middleware
  // All param callbacks will be called before any handler of
  // any route in which the param occurs, and they will each
  // be called only once in a request - response cycle,
  // even if the parameter is matched in multiple routes
  // Here, taskByID will be called first, then read, update, or delete methods
  app.param("studentId", students.studentById);
};
