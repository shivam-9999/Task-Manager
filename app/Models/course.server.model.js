var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
// Define a new 'courseSchema'
var courseSchema = new Schema({
  courseCode: {
    type: String,
    unique: true,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});
// Create the 'Task' model out of the 'courseSchema'
mongoose.model("course", courseSchema);
