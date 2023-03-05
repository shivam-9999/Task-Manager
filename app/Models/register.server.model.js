var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
Schema = mongoose.Schema;

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
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

const register = mongoose.model("register", registerSchema);
module.exports = register;
