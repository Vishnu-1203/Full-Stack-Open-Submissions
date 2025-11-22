import React from 'react'

const Form = ({handleNameChange,handleNumberChange,handlePhonebookUpdate}) => {


  return (
    <form onSubmit={handlePhonebookUpdate}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
          <div>
            number: <input onChange={handleNumberChange}/>
          </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

export default Form