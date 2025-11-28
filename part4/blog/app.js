const express = require('express')
const mongoose = require('mongoose')
const config=require("./utils/config")
const logger=require("./utils/logger")
const blogRouter=require("./controllers/blogRouter")

const app = express()

logger.info("Connecting to MONGODB...")

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(res=>logger.info("Succesfully Connected to MONGODB-"))
    .catch(error=>logger.info("Error Connecting to MONGODB :",error))

app.use(express.json())
app.use("/api/blogs",blogRouter)


module.exports=app