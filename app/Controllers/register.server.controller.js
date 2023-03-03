const mongoose = require("mongoose");
var registerModel = mongoose.model("register");

exports.userRegister = function (req, res, next) {
  console.log("body: " + req.body);
  const { name, email, password } = req.body;
  const user = new registerModel({ name, email, password });
  user.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err.getErrorMessage);
    } else {
      // Use the 'response' object to send a JSON response
      res.json(user);
    }
  });
};
