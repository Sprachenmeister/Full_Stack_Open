import { useState, useEffect } from 'react'
import axios from 'axios'

const filterPersons = (persons, filter) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
}

const Filter = (props) => {
  return (
    <div>
      <p>filter shown with <input value={props.filter} onChange={props.handleFilterChange} /></p>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addContact}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNewName}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
     </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      <ul>
         {props.persons.map((person, index) => (
          <li key={index}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const nameObject = { name: newName, number: newNumber }
      setPersons(persons.concat(nameObject))
    }

    setNewName('')
    setNewNumber('')
  }


  const handleNewName =(event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={(event) => setFilter(event.target.value)} />
      <h3>Add a new</h3>
      <PersonForm 
        addContact={addContact} 
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons(persons, filter)} />
    </div>
  )
}

export default App