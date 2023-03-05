const mongoose = require("mongoose");
var LoginModel = mongoose.model("register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database

    const user = await LoginModel.findOne({
      email: email,
    });
    console.log(user);
    // If the user is not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    // If the password is incorrect
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with JWT token
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.protectedLogin = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    // If token is not provided
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database
    const user = await LoginModel.findById(decoded.userId);

    // If the user is not found
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Protected endpoint" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
