// It will load the express.js file as a module to bootstrap your Express application
//
//The process.env.NODE_ENV variable is set to the default 'development‘
//value if itdoesn 't exist.
// Set the 'NODE_ENV' variable

const cors = require("cors");
process.env.JWT_SECRET = "mysecretkey";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
// Load the module dependencies
var mongoose = require("./config/mongoose"),
  express = require("./config/express");
// Create a new Mongoose connection instance
var db = mongoose().catch((err) => console.error(err));
// Create a new Express application instance
var app = express();
// Allow cross-origin requests from all domains
const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

// Use the Express application instance to listen to the '3000' port
app.listen(3001);
// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
// Log the server status to the console
console.log("Server running at http://localhost:3001/");
