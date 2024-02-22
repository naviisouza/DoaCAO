const router = require("express").Router();

const checkTokenRole = require("../middleware/authMiddlewareEmployee")
const checkToken = require("../middleware/authMiddlewareUser")

const doacaoController = require("../controllers/doacaoController");

//

router.route("/doacoes").post((req, res) => {
  doacaoController.create(req, res);
});

router.route("/doacoes").get(checkTokenRole,(req, res) => {
  doacaoController.getAll(req, res);
});

router.route("/doacoes/:honor").get(checkToken,(req,res)=>{
    doacaoController.getByDonor(req,res);
})

router.route("/doacoes/:honor/:status").get(checkToken,(req,res)=>{
  doacaoController.getByDonorAndStatus(req,res)
})

router.route("/doacao/:id").put(checkTokenRole,(req,res)=>{
  doacaoController.attStatus(req,res)
})

router.route("/doacao/:id").delete(checkToken,(req,res)=>{
  doacaoController.deleteDoacao(req,res)
})

router.route("/horarios").get(checkToken, (req,res)=>{
  doacaoController.getHorarios(req,res)
})

module.exports = router;
