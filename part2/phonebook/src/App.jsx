import { useState } from 'react'
import Persons from './components/persons'
import Filter from './components/filter'
import Form from './components/form'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number,setNumber]=useState('')
  const [useFilter,SetUseFilter]=useState(false)
  const [filter,setFilter]=useState("")

  const handlePhonebookUpdate=(e)=>{
    e.preventDefault()
    if(!persons.find(ele=>ele.name===newName)){
    const newPerson=[{name:newName, number:number, id:persons.length+1}]

    setPersons(persons.concat(newPerson))
    console.log(persons)
  }
  else{
    alert(`${newName} already added to persons!`)
  }
  }
  const handleNumberChange=(e)=>{
    console.log(e.target.value)
    setNumber(e.target.value)

  }
  const handleNameChange=(e)=>{
    console.log(e.target.value)
    setNewName(e.target.value)
  }
  const handleFilter=(e)=>{
    if(filter===""){
      SetUseFilter(false)
    }
    else{
    SetUseFilter(true)
  }
  setFilter(e.target.value)
  }
  const currentPersons=useFilter?persons.filter(ele=>(ele.name).toLowerCase().startsWith(filter.toLowerCase())):persons;
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text={filter} onChange={handleFilter}/>


      <h2>add a new</h2>
      <Form handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handlePhonebookUpdate={handlePhonebookUpdate}/>
      <h2>Numbers</h2>
      <Persons currentPersons={currentPersons}/>
    </div>
  )
}

export default App