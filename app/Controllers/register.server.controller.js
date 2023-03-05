const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerModel = mongoose.model("register");

exports.userRegister = async function (req, res, next) {
  const { name, email, password } = req.body;

  // Check if the email is already taken
  const existingUser = await registerModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already taken" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new registerModel({ name, email, password: hashedPassword });
  await user.save(function (err) {
    if (err) {
      // Call the next middleware with an error message
      return next(err.message);
    } else {
      // Use the 'response' object to send a JSON response
      try {
        const token = jwt.sign(
          { _id: user._id.toString() },
          process.env.JWT_SECRET
        );
        res.status(201).send({ user, token });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};
