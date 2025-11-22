import React from 'react'

const Persons = ({currentPersons}) => {
  return (
    <>{currentPersons.map((person)=><div key={person.id}>{person.name} {person.number}<br/></div>)}</>
  )
}

export default Persons