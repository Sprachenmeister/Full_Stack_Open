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

export default Persons