const router = require("express").Router()

const doacoesRouter = require("./doacoes")

const userRouter = require("./users")

const employeeRouter = require("./employees")

router.use("/", doacoesRouter)

router.use("/auth", userRouter)

router.use("/auth/employee", employeeRouter)

module.exports = router