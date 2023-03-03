var mongoose = require("mongoose");
Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

mongoose.model("login", userSchema);
