const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const PORT = process.env.PORT


const Note = require('./models/note')


app.get('/',(request,response) => {
  response.send('<h1>Hello World</h1>')

})
app.get('/api/notes', (request, response) => {
  console.log('get hit')
  Note.find({}).then(notes => {
    console.log(notes)
    response.json(notes)
  })
})
app.get('/api/notes/:id', (request, response,next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).json({ result }).end()
    })
    .catch(error => next(error))
})
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT,() => {console.log(`Running on port ${PORT}`)})