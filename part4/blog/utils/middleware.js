const User=require("../models/user")
const jwt=require("jsonwebtoken")

const errorHandler = (error, request, response, next) => {
  if (error.name === 'MongoServerError' && error.message.includes('E11000')) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

const tokenExtracter=(request,response,next)=>{
  const authorization=request.get("authorization")
  if(authorization && authorization.startsWith('Bearer ')){
    request.token=authorization.replace("Bearer ","")
  }
  else{
    request.token=null
  }
  next()
}
const userExtractor=async(request,response,next)=>{
  const decodedToken=jwt.verify(request.token,process.env.SECRET)
  
  
  const user=await User.findById(decodedToken.id)
  if(!user)return response.status(401).json({error:"No user found"})

  request.user=user
  next()
}

module.exports={errorHandler,tokenExtracter,userExtractor}