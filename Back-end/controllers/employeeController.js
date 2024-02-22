const { Employee: EmployeeModel } = require("../models/employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const employeeController = {
  register: async (req, res) => {
    try {
      const { name, cpf, password, confirmPassword } = req.body;

      //Validacoes

      if (!name) {
        return res.status(422).json({ msg: "O nome é obrigátorio!" });
      }
      if (!cpf) {
        return res.status(422).json({ msg: "O cpf é obrigátorio!" });
      }
      if (!password) {
        return res.status(422).json({ msg: "A senha é obrigátoria!" });
      }
      if (password !== confirmPassword) {
        return res.status(422).json({ msg: "Senhas diferentes!" });
      }

      const employeeExist = await EmployeeModel.findOne({ cpf: cpf });

      if (employeeExist) {
        return res.status(422).json({ msg: "Funcionário já cadastrado!" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const role = "employee"

      const employee = {
        name: name,
        cpf: cpf,
        password: passwordHash,
        role: role,
      };

      const response = await EmployeeModel.create(employee);

      return res.status(201).json({ msg: "Funcionário criado com Sucesso!" });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  login: async (req, res) => {
    const { cpf, password } = req.body;

    if (!cpf) {
      return res.status(422).json({ msg: "O email é obrigátorio!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigátoria!" });
    }

    const employee = await EmployeeModel.findOne({ cpf: cpf });

    if (!employee) {
      return res.status(404).json({ msg: "Funcionário não existe!" });
    }

    const checkPassword = await bcrypt.compare(password, employee.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const idEmployee = employee._id
      const token = jwt.sign(
        {
          id: employee._id,
        },
        secret
      );

      return res.status(200).json({ msg: "Funcionário autenticado", token , id: idEmployee});
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
};

module.exports = employeeController;
