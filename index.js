const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('build'))
let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]
app.use(express.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/api/persons', (request, response) => {
  response.json(persons)
})
app.get('/info',(request,response) =>{
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
})
app.get('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})
app.delete('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const person= persons.filter(person => person.id === id)
    response.status(204).end()
})
const generateId =()=>{
    const customId = Math.floor(Math.random() * 50)
    while(check = persons.find(person => person.id === customId)){
        customId = Math.floor(Math.random() * 50)
        break
    }
    return customId
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!typeof (body.content)) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      name : body.name,
      number : body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})