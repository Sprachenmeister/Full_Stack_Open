import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', country)
    
    if (country) {
      console.log('fetching country data...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setCountry(response.data)
        })
    }
  }, [country])

const handleChange = (event) => {
  setValue(event.target.value)
}

const onSearch = (event) => {
  event.preventDefault()
  setCountry(value)
}

  return (
    <div>
      <h1>Data for Countries</h1>
      <form onSubmit={onSearch}>
        country: <input value={country} onChange={handleChange} />
        <button type="submit">find</button>
      </form>
      <pre>{JSON.stringify(country, null, 2)}

      </pre>
    </div>
  )
}

export default App
