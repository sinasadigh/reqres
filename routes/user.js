const express = require("express");
const router = express.Router();

// Controllers
const userConteroller = require("../controllers/users/userController");

router.get(
  "/",

  userConteroller.get_all_users
);
router.get(
  "/:id",

  userConteroller.get_user
);
router.post(
  "/",

  userConteroller.create_user
);
router.put(
  "/:id",

  userConteroller.update_user
);
router.patch(
  "/:id",

  userConteroller.update_user
);
router.delete(
  "/:id",

  userConteroller.delete_user
);

module.exports = router;
