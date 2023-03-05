//Load the index controller
const login = require("../Controllers/login.server.controller");

module.exports = function (app) {
  app.post("/login", login.userLogin);
  app.post("/protected", login.protectedLogin);
};
