const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes=(blogs)=>{
    const total=(sum,cur)=>{
      return sum+cur.likes
    }
    return blogs.length===0?0:blogs.reduce(total,0)

}

const favoriteBlog=(blogs)=>{
    let favorite={likes:0}
    blogs.forEach(blog=>{
      if(favorite.likes<blog.likes)favorite=blog;

    })
    return blogs.length==0?0:favorite
}
const mostBlogs=(blgs)=>{
  let most=0
  let ans=""
  let hashmap=new Map()
  blgs.forEach(blog=>{
    const count = (hashmap.get(blog.author) ?? 0) + 1
    hashmap.set(blog.author, count)

    if (count > most) {
      most = count
      ans = blog.author
    }
  })
  return blgs.length==0?{}:{author:ans,blogs:hashmap.get(ans)}
}
const mostLikes=(blogs)=>{
  if(blogs.length==0)return{}
  let maxLikes=new Map()
  let person={author:"None",likes:0}
  blogs.forEach(blog=>{
      const likes=maxLikes.get(blog.author)?maxLikes.get(blog.author)+blog.likes:blog.likes
      maxLikes.set(blog.author,likes)
      if(likes>person.likes){
        person.author=blog.author
        person.likes=likes
      }
  })
  return person
}


module.exports = {
  dummy, totalLikes,favoriteBlog,mostBlogs,mostLikes
}