import React from 'react'

const Persons = ({currentPersons,deletePerson}) => {
  return (
    <>{currentPersons.map((person)=>
    <div key={person.id}>{person.name} {person.number}
    <button onClick={()=>deletePerson(person.id,person.name)}>Delete</button>
    <br/>
    </div>
  )}</>
  )
}

export default Persons