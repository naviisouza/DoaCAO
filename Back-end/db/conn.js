const mongoose = require("mongoose")
require("dotenv").config()

async function main(){

    try{

        await mongoose.connect(process.env.DATABASE_URL)

        console.log("Conect sucefull!")

    }catch(error){
        console.log("Error: "+error)
    }

}

module.exports = main