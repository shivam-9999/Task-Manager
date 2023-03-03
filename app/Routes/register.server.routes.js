const register = require("../Controllers/register.server.controller");

module.exports = function (app) {
  app.post("/register", register.userRegister);
};
