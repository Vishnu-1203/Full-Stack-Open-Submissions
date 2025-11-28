const blogRouter=require("express").Router()
const Blog=require("../models/blog")
const User=require("../models/user")
const jwt=require("jsonwebtoken")


blogRouter.get('/', async(request, response) => {
  const res=await Blog.find({}).populate("user")
  response.json(res)
})

blogRouter.post('/', async(request, response) => {
  const body=request.body
  
  if(request.body.likes===undefined)request.body.likes=0;
  if(request.body.url===undefined)return response.status(400).end();
  if(request.body.title===undefined)return response.status(400).end();

  let userFound = request.user
  if(!userFound){
    return response.status(400).json({error:"userid not found"})
  }
  body.user = userFound._id

  const blog = new Blog(request.body)
  const result=await blog.save()

  userFound.blogs=userFound.blogs.concat(result._id)
  await userFound.save()
  response.status(201).json(result)
})

blogRouter.delete("/:id",async(request,response)=>{
  const decodedToken=request.user
  
  const blog=await Blog.findById(request.params.id)

  if(blog.user.toString()!=decodedToken.id){
    return response.status(401).json({error:"deletion not possible, different IDS"})
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})
blogRouter.put("/:id",async(request,response)=>{
  let blog=await Blog.findById(request.params.id)

  if(!blog)return response.status(404).json(blog)
  
  blog.likes=request.body.likes

  const updatedBlog=await blog.save()
  response.json(updatedBlog)
  
})


module.exports=blogRouter