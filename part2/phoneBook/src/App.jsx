import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './assets/Filter'
import PersonForm from './assets/PersonForm'
import Persons from './assets/Persons'

const filterPersons = (persons, filter) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()

    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {
      const nameObject = { name: newName, number: newNumber }
      personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
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