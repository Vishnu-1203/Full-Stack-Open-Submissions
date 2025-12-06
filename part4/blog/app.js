const express = require('express')
const mongoose = require('mongoose')
const config=require("./utils/config")
const logger=require("./utils/logger")
const blogRouter=require("./controllers/blogRouter")
const userRouter=require("./controllers/userRouter")
const loginRouter=require("./controllers/loginRouter")
const {errorHandler,tokenExtracter,userExtractor}=require("./utils/middleware")

const app = express()

logger.info("Connecting to MONGODB...")

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(res=>logger.info("Succesfully Connected to MONGODB-"))
    .catch(error=>logger.info("Error Connecting to MONGODB :",error))

app.use(express.json())

app.use(tokenExtracter)

app.use("/api/blogs",blogRouter)
app.use("/api/users",userRouter)
app.use("/api/login",loginRouter)

app.use(errorHandler)


module.exports=app