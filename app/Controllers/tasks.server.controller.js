// Load the 'Task' Mongoose model
var Task = require('mongoose').model('Task');
//
// Create a new error handling controller method
const getErrorMessage = function(err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    // Return the message error
    return message;
};
// Create a new task
exports.createTask = function (req, res, next) {
    // Create a new instance of the 'Task' Mongoose model
    var task = new Task(req.body); //get data from React form
    console.log("body: " + req.body.taskName);

    // Use the 'Task' instance's 'save' method to save a new task document
    task.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(task);
            
        }
    });
};
//
// Returns all tasks
exports.list = function (req, res, next) {
    // Use the 'Task' static's 'find' method to retrieve a new task document
    Task.find({}, function (err, tasks) {
        if (err) {
            return next(err);
        } else {
            res.json(tasks);
        }
    });
};
//
//'read' controller method to display a task
exports.read = function(req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.task);
};
//
// 'taskByID' controller method to find a task by its id
exports.taskByID = function (req, res, next, id) {
    // Use the 'Task' static 'findOne' method to retrieve a specific a task
    Task.findOne({
        _id: id
    }, (err, task) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.task' property
            req.task = task;
            console.log(task);
            // Call the next middleware
            next();
        }
    });
};
//update a task by id
exports.update = function(req, res, next) {
    console.log(req.body);
    Task.findByIdAndUpdate(req.task.id, req.body, function (err, task) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(task);
    });
};
// delete a task by id
exports.delete = function(req, res, next) {
    console.log('in delete:',req.task.id, req.body)
    Task.findByIdAndRemove(req.task.id, req.body, function (err, task) {
      if (err) return next(err);
      res.json(task);
    });
};
