import { useState,useEffect } from 'react'
import Persons from './components/persons'
import Filter from './components/filter'
import Form from './components/form'
import Notification from './components/notification'

import phonebookServices from './services/phonebook'

const App = () => {
   const [persons, setPersons] = useState([])

    useEffect(()=>{
      phonebookServices.getAll().then(res=>{
        console.log(res)
        setPersons(res)
      })
    },[])
    const [newName, setNewName] = useState('')
    const [number,setNumber]=useState('')
    const [useFilter,SetUseFilter]=useState(false)
    const [filter,setFilter]=useState("")
    const [notification,setNotification]=useState(null)

    const [messageType,setMessageType]=useState('notification')
    const handlePhonebookUpdate=(e)=>{
    e.preventDefault()
    const personFound=persons.find(ele=>ele.name===newName)
    if(!personFound){
      const newPerson={name:newName, number:number, id:(persons.length+1).toString()}
      phonebookServices.addPerson(newPerson).then(res=>{
        setPersons(persons.concat(res))
        console.log(res)
        setMessageType('notification')
        setNotification(`${res.name} Added!`)
        setTimeout(()=>{setNotification(null)},3000)
      }).catch(e=>console.log("failed adding cuz of",e))       
    }
    else{
      if(personFound.number!=number){
        if(confirm(`${newName} is already added to Phonebook, replace the old number with new one?`)){
          const newPerson={...personFound,number:number}
          phonebookServices.updatePersonNumber(personFound.id,newPerson).then(res=>{
            console.log(`updating succesful! for ${res.name}`)
            setPersons(persons.map(person=>person.id==personFound.id?newPerson:person))

            setMessageType('notification')
            setNotification(`${res.name} updated with number ${res.number}`)
            setTimeout(()=>{setNotification(null)},3000)

          }).catch(e=>console.log(`updating number ${personFound.name} failed due to ${e}`))
        }
        
      }else{
          alert("Number provided is also same, No change possible")
          console.log("Number provided is also same, No change possible")
        }
    }
    }

    const deletePerson=(id,name)=>{
      if(confirm(`Delete ${name}?`)){
      phonebookServices.deletePersonWithId(id).then(res=>{
        console.log("succesfully deleted!",res)
        setPersons(persons.filter(person=>person.id!=id))
      }).catch(e=>{
        console.log("deletion failed")
        setMessageType('error')
        setNotification(`information of ${name} already removed from server`)
        setTimeout(()=>{setNotification(null)},3000)
      }
      )
    }
    else{
      console.log("not deleting")
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

        <Notification notification={notification} cname={messageType}/>

        <Filter text={filter} onChange={handleFilter}/>


        <h2>add a new</h2>
        <Form handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handlePhonebookUpdate={handlePhonebookUpdate}/>
        <h2>Numbers</h2>
        <Persons currentPersons={currentPersons} deletePerson={deletePerson}/>
      </div>
    )
  }

export default App