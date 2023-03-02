var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// Define a new 'TaskSchema'
var studentSchema  = new Schema({
    studentNumber: { type: String, unique: true, required: true },
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city:String,
    phoneNumber:String,
    email:String,
    program:String,
    dateOfBirth: Date,
    nationality: String
});
// Create the 'Task' model out of the 'TaskSchema'
mongoose.model('student', studentSchema);
