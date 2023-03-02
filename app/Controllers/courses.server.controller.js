// Load the 'Task' Mongoose model
var coursesModel = require('mongoose').model('course');

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
exports.createCourses = function (req, res, next) {
    // Create a new instance of the 'Task' Mongoose model
    console.log("body: " + req.body.courseCode);
    var course = new coursesModel(req.body); //get data from React form
    

    // Use the 'course' instance's 'save' method to save a new course document
    course.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err.getErrorMessage);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(course);
            
        }
    });
};
//
// Returns all coursesModel
exports.courseList = function (req, res, next) {
    // Use the 'coursesModel' static's 'find' method to retrieve a new task document
    coursesModel.find({}, function (err, course) {
        if (err) {
            return next(err);
        } else {
            res.json(course);
        }
    });
};
//
//'read' controller method to display a task
exports.courseRead = function(req, res) {
    // Use the 'response' object to send a JSON response
    res.json(req.course);
};
//
// 'studentById' controller method to find a task by its id
exports.courseById = function (req, res, next, id) {
    // Use the 'Task' static 'findOne' method to retrieve a specific a task
    coursesModel.findOne({
        _id: id
    }, (err, course) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.course' property
            req.course = course;
            console.log(course);
            // Call the next middleware
            next();
        }
    });
};
//update a student by id
exports.courseUpdate = function(req, res, next) {
    console.log(req.body);
    coursesModel.findByIdAndUpdate(req.course.id, req.body, function (err, course) {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.json(course);
    });
};
// delete a student by id
exports.courseDelete = function(req, res, next) {
    console.log('in delete:',req.course.id, req.body)
    coursesModel.findByIdAndRemove(req.course.id, req.body, function (err, course) {
      if (err) return next(err);
      res.json(course);
    });
};