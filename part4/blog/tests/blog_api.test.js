const { test , after, beforeEach,describe }=require("node:test")
const assert=require("node:assert")
const mongoose=require("mongoose")
const supertest=require("supertest")
const app=require("../app")

const helper=require("./blog_helper")
const Blog=require("../models/blog")

const api=supertest(app)

beforeEach(async()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test("Testing blogs GET/API",async()=>{
    let response=await api.get("/api/blogs").expect(200).expect('Content-Type', /application\/json/)
    
  
    assert.strictEqual(response.body.length,helper.initialBlogs.length)
})

test("Testing for ID",async()=>{
  const response=await helper.blogsInDb()
  response.map(blog=>{
    assert(blog.id)
    assert.strictEqual(undefined,blog._id)
  })

})

test("Testing Post works",async()=>{
  const newBlog={
    title:"test1",
    author:"pas",
    url:"www.test.com",
    likes:838
  }
  const blogsAtStart=await helper.blogsInDb()
  const response=await api.post("/api/blogs").send(newBlog)
  const blogsAtEnd=await helper.blogsInDb()
  const result={
    title:response.body.title,
    author:response.body.author,
    url:response.body.url,
    likes:response.body.likes
  }
  assert.deepStrictEqual(result,newBlog)
  
  assert.strictEqual(blogsAtStart.length+1,blogsAtEnd.length)
})

test("likes default to zero?",async()=>{
  const newBlog={
    title:"test1",
    author:"pas",
    url:"www.test.com",
  }

  const response=await api.post("/api/blogs").send(newBlog)

  assert.strictEqual(response.body.likes,0)

})

test("url or title missing then 404",async()=>{
  const newBlog={author:"aryan"}

  await api.post("/api/blogs").send(newBlog).expect(400)

})


describe("PUT and Delete",async()=>{
  test("Testing Delete",async()=>{
    const blogsAtStart=await helper.blogsInDb()
    const id=blogsAtStart[0].id
    await api.delete(`/api/blogs/${id}`)
    const blogsAtEnd=await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogsAtStart[0].title))
  })

  test("Testing Put",async()=>{
    const blogsAtStart=await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      likes: blogToUpdate.likes + 10
      }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedData)

    const blogsAtEnd=await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10)

  })



})


after(async () => {
  await mongoose.connection.close()
})