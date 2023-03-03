const mongoose = require("mongoose");
var loginModel = mongoose.model("login");

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await loginModel.findOne({ username });

    // If the user is not found
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password is incorrect
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with JWT token
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });

    res.status(200).json({ message: "Login successful" });
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
    const user = await User.findById(decoded.userId);

    // If the user is not found
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Protected endpoint" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
