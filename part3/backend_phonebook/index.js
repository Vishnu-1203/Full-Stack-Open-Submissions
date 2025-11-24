const express=require("express")
const app=express()
const morgan=require("morgan")
const cors=require("cors")
app.use(express.json())
app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body `))

const PORT=3001


const generateId=()=>{
    const id=Math.floor(Math.random()*50000000)
    console.log("max id is ",id+1)
    return String(id+1)
}

let phonebook=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons",(request,response)=>{
    console.log(request.body)
    response.json(phonebook)
})

app.get("/info",(request,response)=>{
    const currentTime=new Date()
    console.log(request.body)
    response.send(`<p>Phonebook has info for ${phonebook.length} people.</p>
        ${currentTime}
        `)
})
app.get("/api/persons/:id",(request,response)=>{
    const id=request.params.id
    const person=phonebook.find(p=>p.id===id)
    if(!person){
        return response.status(404).json({error:"user does not exist"})
    }
    response.json(person)
})

app.delete("/api/persons/:id",(request,response)=>{
    const id=request.params.id
    phonebook=phonebook.filter(p=>p.id!=id)
    console.log(phonebook,"after deleted of ",id)
    response.status(204).end()
})

app.post("/api/persons",(request,response)=>{
    const body=request.body


    if(!body.name)return response.status(400).json({error:"name is missing"});
    if(!body.number)return response.status(400).json({error:"number is missing"});

    const person=phonebook.find(p=>p.name==body.name)
    if(person)return response.status(400).json({error:"person already exists"});

    const newPerson={id:generateId(),name:body.name,number:String(body.number)}
    phonebook=phonebook.concat(newPerson)

    response.json(newPerson)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT,()=>{console.log(`Listening in PORT:${PORT}`)})