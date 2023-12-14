const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/usersController");

const { checkValidity } = require("../middlewares/schemaValidator");
const { checkSchema } = require("express-validator");

const userRegister = require("../validations/userRegister");
const userLogin = require("../validations/userLogin");

router.get("/users", usersController.index);

router.get("/users/:id", usersController.show);

router.post(
  "/register",
  checkSchema(userRegister),
  checkValidity,
  usersController.register
);
router.post(
  "/login",
  checkSchema(userLogin),
  checkValidity,
  usersController.login
);

router.put("/users/:id", usersController.update);

module.exports = router;
