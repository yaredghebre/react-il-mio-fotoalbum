const express = require("express");
const router = express.Router();
const picturesController = require("../../controllers/admin/picturesController");
const multer = require("multer");
const authHandler = require("../../middlewares/usersAuthHandler");
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
  query("").optional().isBoolean().withMessage("Visible must be a Boolean!"),
  query("content").optional().trim().escape(),
  picturesController.index
);

router.get("/:id", picturesController.show);

router.post(
  "/",
  multer({ storage: storage }).single("image"),
  [
    body("title").notEmpty().isString().withMessage("Title must be inserted!"),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("Description must be inserted!"),
    body("image").custom((value, { req }) => {
      if (!req.file) throw new Error("Image must be uploaded");
      return true;
    }),
  ],
  picturesController.store
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  [
    body("title").notEmpty().isString().withMessage("Title must be inserted!"),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("Description must be inserted!"),
    body("image").custom((value, { req }) => {
      if (!req.file) throw new Error("Image must be uploaded");
      return true;
    }),
  ],
  picturesController.update
);

router.delete("/:id", picturesController.destroy);

module.exports = router;
