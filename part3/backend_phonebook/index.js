const express=require('express')
require('dotenv').config()
const morgan=require('morgan')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '))


const PORT=process.env.PORT||3001

const Phonebook=require('./models/phonebook')
let length=0

app.get('/api/persons',(request,response,next) => {
  console.log(request.body)
  Phonebook.find({}).then(result => {
    length=result.length
    response.json(result)
  }).catch(e => next(e))
})

app.get('/info',(request,response) => {
  const currentTime=new Date()
  console.log(request.body)
  response.send(`<p>Phonebook has info for ${length} people.</p>
        ${currentTime}
        `)
})

app.get('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  console.log('find by id',id)
  Phonebook.findById(id).then(result => {
    console.log(result,' result')
    response.json(result)}).catch(e => next(e))

})

app.delete('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  console.log(id,typeof(id))
  Phonebook.findByIdAndDelete(id).then(result => {
    console.log('Deleted! :',result)
    return response.status(204).end()
  }).catch(e => next(e))
})

app.put('/api/persons/:id',(request,response,next) => {
  Phonebook.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).end()
    }
    console.log('found person for updating:',person)

    person.name=request.body.name
    person.number=request.body.number

    person.save().then(res => {
      console.log('updated!',res)
      return response.status(200).json(res)
    }).catch(e => next(e))

  })
})

app.post('/api/persons',(request,response,next) => {
  const body=request.body




  const newPerson=new Phonebook({ name:body.name,number:body.number })

  newPerson.save().then(result => {
    console.log('saved succesfully!')
    return response.json(result)
  }).catch(e => next(e))

})

const errorHandler = (error,request, response,next) => {
  console.error(error)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name==='ValidationError'){

    return response.status(400).json({ error:error.message })

  }

  next(error)

}

app.use(errorHandler)

app.listen(PORT,() => {console.log(`Listening in PORT:${PORT}`)})