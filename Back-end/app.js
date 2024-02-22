const express = require("express")
const cors = require("cors")
const conn = require("./db/conn")
const routes = require("./routes/router")

conn()

require("dotenv").config()

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api',routes)

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running!")
})

//3QfeX339lOqRJ8bhs