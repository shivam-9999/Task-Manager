// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports =  () => {
    // Use Mongoose to connect to MongoDB
    mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('DB Connected!');
    }).catch(err => {
      console.log('Error connecting to DB', err);
    });

    // Load the 'Task' model 
    require('../app/models/task.server.model');
    
    // Return the Mongoose connection instance
    return mongoose.connection;
};
