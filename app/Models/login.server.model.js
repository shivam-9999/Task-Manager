const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
});

const LoginModel = mongoose.model("login", loginSchema);

module.exports = LoginModel;
