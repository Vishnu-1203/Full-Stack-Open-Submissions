const Blog=require("../models/blog")

const initialBlogs=[{
    title:"Introduction to HTML",
    author:"melvin",
    url:"www.introtohtml.com",
    likes:9999
    },
    {
    title:"Introduction to css",
    author:"aryan",
    url:"www.introtocss.com",
    likes:43525
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
            title:"test",
            author:"pou",
            url:"www.test.com",
            likes:8218
        })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}