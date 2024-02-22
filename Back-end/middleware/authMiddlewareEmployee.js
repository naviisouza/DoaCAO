const jwt = require("jsonwebtoken");
const { Employee: EmployeeModel } = require("../models/employee");
require("dotenv").config();

async function buscaEmployee(id) {
  const employeeExist = await EmployeeModel.findOne({ _id: id });
  return employeeExist.cpf;
}

async function checkTokenRole(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    const decodedToken = jwt.verify(token, secret);

    const employeeId = decodedToken.id;

    const cpf = await buscaEmployee(employeeId);
    if (!cpf) {
      return res.status(401).json({ msg: "Não Possui permissão!" });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ msg: "Token inválido" });
  }
}

module.exports = checkTokenRole;
