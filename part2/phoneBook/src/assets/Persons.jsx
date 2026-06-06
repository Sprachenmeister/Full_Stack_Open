const filterPersons = (persons, filter) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
}

const Persons = ({ persons, filter, deletePersonFromList }) => {

  return (
      <ul>
        {filterPersons(persons, filter).map(person => (
          <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => deletePersonFromList(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    )
}

export default Persons