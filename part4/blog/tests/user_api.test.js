const { test, beforeEach, describe, after}=require("node:test")
const assert=require("node:assert")
const mongoose=require("mongoose")
const supertest=require("supertest")
const app=require("../app")

const User=require("../models/user")
const helper=require("../tests/user_helper")
const api=supertest(app)

beforeEach(async()=>{
    await User.deleteMany({})
    await User.insertMany(helper.users)
})


describe("User controller checking",async()=>{
  
    test("checking for duplicate usernames",async()=>{

        const newUser={
            name:"randomUser1",
            username:"admin",
            password:"pass1"
        }

        await api.post("/api/users").send(newUser)

        const anotherUser={
            name:"randomUser2",
            username:"admin",
            password:"pass2"
        }

        await api.post("/api/users").send(anotherUser).expect(400)


    })

})

after(async()=>{
    mongoose.connection.close()
})