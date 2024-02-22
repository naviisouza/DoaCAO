const router = require("express").Router();

const EmployeeController = require("../controllers/employeeController");

router.route("/register").post((req, res) => {
    EmployeeController.register(req, res);
  });

router.route("/login").post((req, res) => {
    EmployeeController.login(req, res);
  });

module.exports = router;
