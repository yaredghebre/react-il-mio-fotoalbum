const express = require("express");
const router = express.Router();
const picturesController = require("../controllers/picturesController");
const multer = require("multer");
const authHandler = require("../middlewares/usersAuthHandler");
const { body, param, query } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

router.get(
  "/",
  query("visible")
    .optional()
    .isBoolean()
    .withMessage("Visible must be a Boolean!"),
  query("content").optional().trim().escape(),
  picturesController.index
);

router.get("/:id", query("visible"), picturesController.show);

module.exports = router;
