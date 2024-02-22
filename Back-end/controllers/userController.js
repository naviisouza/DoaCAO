const { User: UserModel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword, phone } =
        req.body;

      //Validacoes

      if (!name) {
        return res.status(422).json({ msg: "O nome é obrigátorio!" });
      }
      if (!email) {
        return res.status(422).json({ msg: "O email é obrigátorio!" });
      }
      if (!password) {
        return res.status(422).json({ msg: "A senha é obrigátoria!" });
      }
      if (password !== confirmPassword) {
        return res.status(422).json({ msg: "Senhas diferentes!" });
      }
      if (!phone) {
        return res.status(422).json({ msg: "O telefone é obrigátorio!" });
      }

      const userExist = await UserModel.findOne({ email: email });

      if (userExist) {
        return res.status(422).json({ msg: "Email já cadastrado!" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = {
        name: name,
        email: email,
        password: passwordHash,
        phone: phone
      };

      const response = await UserModel.create(user);

      return res.status(201).json({ msg: "Usuário criado com Sucesso!" });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ msg: "O email é obrigátorio!" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigátoria!" });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não existe!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida!" });
    }

    try {
      const secret = process.env.SECRET;
      const idUser = user._id
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      return res.status(200).json({ msg: "Usuário autenticado", token , id: idUser});
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  },
};

module.exports = UserController;
