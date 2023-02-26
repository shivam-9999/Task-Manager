//Load the index controller
const index = require('../../app/Controllers/index.server.controller');
// Load the 'tasks' controller
const tasks = require('../../app/Controllers/tasks.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'tasks' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);
    
    // a post request to /tasks will execute createTask method in tasks.server.controller
    app.route('/tasks').post(tasks.createTask);
    
    // a get request to /tasks will execute list method in tasks.server.controller
    app.get("/tasks",tasks.list); //go to http://localhost:3000/taskss to see the list
    //
    // Set up the 'taskss' parameterized routes 
    app.route('/tasks/:taskId')
    .get(tasks.read)
    .put(tasks.update)
    .delete(tasks.delete)
    // Set up the 'taskId' parameter middleware
    // All param callbacks will be called before any handler of 
    // any route in which the param occurs, and they will each 
    // be called only once in a request - response cycle, 
    // even if the parameter is matched in multiple routes
    // Here, taskByID will be called first, then read, update, or delete methods
    app.param('taskId', tasks.taskByID);
};
