const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGODB

async function initializeDatabase(){
    await mongoose
    .connect(mongoUrl)
    .then(() => console.log("Successfully connected to database"))
    .catch(() => console.log("Error connecting to database"))
}

module.exports = { initializeDatabase }