import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Filter from './assets/Filter'
import PersonForm from './assets/PersonForm'
import Persons from './assets/Persons'
import PersonRemovalError from './assets/PersonRemovalError'
import PersonAddedNotification from './assets/PersonAddedNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

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
      if (window.confirm(`${newName} is already in the phonebook, do you want to update the number?`)) {
      const person = persons.find(p => p.name === newName)
      const updatedPerson = { ...person, number: newNumber }
      personsService
        .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        })
      }
    } 
    else {
      const nameObject = { name: newName, number: newNumber }
      personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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

  const deletePersonFromList = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => { 
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonRemovalError message={errorMessage} />
      <PersonAddedNotification message={notificationMessage} />
      <Filter 
      filter={filter} 
      handleFilterChange={(event) => 
      setFilter(event.target.value)} 
      />
      <h3>Add a new</h3>
      <PersonForm 
        addContact={addContact} 
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber} 
        handleNewNumber={handleNewNumber} 
        />
      <h3>Numbers</h3>
      <Persons 
      persons={persons} 
      filter={filter} 
      deletePersonFromList={deletePersonFromList} 
      />
    </div>
  )
}

export default App