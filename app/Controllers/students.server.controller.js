// Load the 'Task' Mongoose model
var studentModel = require('mongoose').model('student');

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
exports.createStudent = function (req, res, next) {
    // Create a new instance of the 'Task' Mongoose model
    var student = new studentModel(req.body); //get data from React form
    console.log("body: " + req.body.studentNumber);

    // Use the 'student' instance's 'save' method to save a new student document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);
            
        }
    });
};
//
// Returns all studentModel
exports.list = function (req, res, next) {
    // Use the 'studentModel' static's 'find' method to retrieve a new task document
    studentModel.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
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
// 'studentById' controller method to find a task by its id
exports.studentById = function (req, res, next, id) {
    // Use the 'Task' static 'findOne' method to retrieve a specific a task
    studentModel.findOne({
        _id: id
    }, (err, student) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.student' property
            req.student = student;
            console.log(student);
            // Call the next middleware
            next();
        }
    });
};
//update a student by id
exports.update = function(req, res, next) {
    console.log(req.body);
    studentModel.findByIdAndUpdate(req.student.id, req.body, function (err, student) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(student);
    });
};
// delete a student by id
exports.delete = function(req, res, next) {
    console.log('in delete:',req.student.id, req.body)
    studentModel.findByIdAndRemove(req.student.id, req.body, function (err, student) {
      if (err) return next(err);
      res.json(student);
    });
};