const express = require("express");
const router = express.Router();

// Controllers
const unknownConteroller = require("../controllers/unknown/unknownController");

router.get(
  "/",

  unknownConteroller.get_all_unknowns
);
router.get(
  "/:id",

  unknownConteroller.get_unknown
);
router.post(
  "/",

  unknownConteroller.unknown_create
);

module.exports = router;
