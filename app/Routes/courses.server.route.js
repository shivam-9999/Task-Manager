//Load the index controller
const index = require("../../app/Controllers/index.server.controller");
// Load the 'tasks' controller
const course = require("../../app/Controllers/courses.server.controller");

// Define the routes module' method
module.exports = function (app) {
  // Set up the 'course' base routes
  //show the 'index' page if a GET request is made to root
  app.route("/").get(index.render);

  // a post request to /course will execute createTask method in course.server.controller
  app.route("/course").post(course.createCourses);

  // a get request to /course will execute list method in course.server.controller
  app.get("/courseList", course.courseList); //go to http://localhost:3001/courses to see the list
  //
  // Set up the 'courses' parameterized routes
  app
    .route("/courseList/:courseId")
    .get(course.courseRead)
    .put(course.courseUpdate)
    .delete(course.courseDelete);
  // Set up the 'courseId' parameter middleware
  // All param callbacks will be called before any handler of
  // any route in which the param occurs, and they will each
  // be called only once in a request - response cycle,
  // even if the parameter is matched in multiple routes
  // Here, taskByID will be called first, then read, update, or delete methods
  app.param("courseId", course.courseById);
};
