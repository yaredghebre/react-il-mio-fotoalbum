const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/admin/categoriesController");

const { body } = require("express-validator");

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoriesController.index();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  body("content").isString().notEmpty().isLength({ min: 3 }),
  categoriesController.store
);

module.exports = router;
