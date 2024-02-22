const { Doacao: DoacaoModel } = require("../models/doacao");
const moment = require("moment");

const doacaoController = {
  create: async (req, res) => {
    try {
      const doacao = {
        date: req.body.date,
        type: req.body.type,
        description: req.body.description,
        status: req.body.status,
        donor: req.body.donor,
      };
  
      const response = await DoacaoModel.create(doacao);
  
      res.status(201).json({
        response,
        msg: "Doação Incluída com Sucesso!"
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  

  getAll: async (req, res) => {
    try {
      const doacoes = await DoacaoModel.find();

      res.json(doacoes);
    } catch (error) {
      console.log(error);
    }
  },

  getByDonor: async (req, res) => {
    try {
      const honorId = req.params.honor;

      const doacoes = await DoacaoModel.find({ donor: honorId });

      res.status(200).json({ doacoes });
    } catch (error) {
      console.log(error);
    }
  },

  getByDonorAndStatus: async (req, res) => {
    try {
      const honorId = req.params.honor;

      const status = req.params.status;

      const doacoes = await DoacaoModel.find({
        donor: honorId,
        status: status,
      });

      res.status(200).json({ doacoes });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  attStatus: async (req, res) => {
    try {
      const doacaoId = req.params.id;
      const status = req.body.status;

      if (
        status !== "em andamento" &&
        status !== "concluida" &&
        status !== "rejeitada"
      ) {
        res.status(422).json({ msg: "Status inválido!" });
        return; // Adicionado para evitar que o código continue executando
      }

      const doacao = await DoacaoModel.findByIdAndUpdate(doacaoId, {
        status: status,
      });

      res.status(200).json({ msg: "Status alterado com sucesso!" });
    } catch (error) {
      res.json(500).json({msg:error})
    }
  },


  deleteDoacao: async(req,res)=>{

    try{

      const id = req.params.id;

      const doacao = await DoacaoModel.findByIdAndDelete(id)

      res.status(200).json({msg:'Doação deletada com sucesso!'})

    }catch(error){

      res.json(500).json({msg:error})

    }


  },

  getHorarios: async (req, res) => {
    try {
      const existingDoacoes = await DoacaoModel.find();
  
      const horariosOcupados = existingDoacoes.map((doacao) => moment(doacao.date));
  
      const horariosDisponiveis = {};
      const diasDisponiveis = 15;
  
      const horaInicio = moment().hour(9).minute(0).second(0);
      const horaFim = moment().hour(18).minute(0).second(0);
      let dataAtual = moment().startOf('day');
      let dia = 0;
  
      while (dia < diasDisponiveis) {
        const horariosDia = [];
        let horaAtual = moment(horaInicio);
  
        while (horaAtual.isSameOrBefore(horaFim)) {
          const dataHoraAtual = moment(dataAtual).add(horaAtual.hours(), 'hours').add(horaAtual.minutes(), 'minutes');
          if (!horariosOcupados.some((hora) => hora.isSame(dataHoraAtual))) {
            horariosDia.push(horaAtual.format("HH:mm"));
          }
          horaAtual = horaAtual.add(15, "minutes");
        }
  
        if (horariosDia.length > 0) {
          horariosDisponiveis[dataAtual.format("YYYY-MM-DD")] = horariosDia;
        }
  
        dataAtual = dataAtual.add(1, "day");
        dia++;
      }
  
      res.status(200).json({ horariosDisponiveis });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

};

module.exports = doacaoController;
