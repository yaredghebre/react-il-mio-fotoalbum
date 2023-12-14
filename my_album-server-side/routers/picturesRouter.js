const express = require("express");
const router = express.Router();
const picturesController = require("../controllers/picturesController");

router.get("/", picturesController.index);

router.get("/:id", picturesController.show);

router.post("/", picturesController.store);

router.put("/:id", picturesController.update);

router.delete("/:id", picturesController.destroy);

module.exports = router;
