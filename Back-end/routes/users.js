const router = require("express").Router();

const UserController = require("../controllers/userController");

router.route("/register").post((req, res) => {
    UserController.register(req, res);
  });

router.route("/login").post((req, res) => {
    UserController.login(req, res);
  });

module.exports = router;
