const blogRouter=require("express").Router()
const note = require("../../notes_backend/models/note")
const Blog=require("../models/blog")

blogRouter.get('/', async(request, response) => {
  const res=await Blog.find({})
  response.json(res)
})

blogRouter.post('/', async(request, response) => {
  if(request.body.likes===undefined)request.body.likes=0;
  if(request.body.url===undefined)return response.status(400).end();
  if(request.body.title===undefined)return response.status(400).end();

  const blog = new Blog(request.body)

  const result=await blog.save()
  response.status(201).json(result)
})

blogRouter.delete("/:id",async(request,response)=>{
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