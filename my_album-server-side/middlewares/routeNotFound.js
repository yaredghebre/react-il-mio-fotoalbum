const NotFound = require("../exceptions/NotFound");

module.exports = function (req, res, next) {
  next(new NotFound("Route requested not found!"));
};
