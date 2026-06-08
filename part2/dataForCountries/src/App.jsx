import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherByCapital, setWeatherByCapital] = useState({})
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [] )

  const handleChange = (event) => {
    setValue(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(value.toLowerCase())
  )

  const countriesToShow = selectedCountry ? [selectedCountry] : filteredCountries
  const countryToShow = countriesToShow.length === 1 ? countriesToShow[0] : null
  const capital = countryToShow?.capital?.[0]
  const weatherData = capital ? weatherByCapital[capital] : null

  useEffect(() => {
    if (!capital || !apiKey || weatherByCapital[capital]) {
      return
    }

    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: capital,
          appid: apiKey,
          units: 'metric'
        }
      })
      .then(response => {
        setWeatherByCapital(prev => ({
          ...prev,
          [capital]: { data: response.data }
        }))
      })
      .catch(() => {
        setWeatherByCapital(prev => ({
          ...prev,
          [capital]: { error: 'Unable to fetch weather data' }
        }))
      })
  }, [capital, apiKey, weatherByCapital])

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <h1>Data for Countries</h1>
      <form>
        country: <input value={value} onChange={handleChange} />
      </form>

      {value === '' ? (
        <p>Type a country name to search</p>
      ) : countriesToShow.length === 0 ? (
        <p>No matches found</p>
      ) : countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <div>
          <h2>{countryToShow.name.common}</h2>
          <p>capital {countryToShow.capital?.[0] ?? 'N/A'}</p>
          <p>area {countryToShow.area}</p>

          <h3>languages</h3>
          <ul>
            {Object.values(countryToShow.languages ?? {}).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img
            src={countryToShow.flags.png}
            alt={countryToShow.flags.alt ?? `Flag of ${countryToShow.name.common}`}
          />

          <h3>Weather in {countryToShow.capital?.[0] ?? 'capital city'}</h3>
          {!apiKey ? (
            <p>Weather API key is missing</p>
          ) : !capital ? (
            <p>Capital city is not available for weather lookup</p>
          ) : weatherData?.error ? (
            <p>{weatherData.error}</p>
          ) : weatherData?.data ? (
            <div>
              <p>temperature {weatherData.data.main.temp} Celsius</p>
              {weatherData.data.weather?.[0]?.icon ? (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`}
                  alt={weatherData.data.weather[0].description ?? 'Weather icon'}
                />
              ) : null}
              <p>wind {weatherData.data.wind.speed} m/s</p>
            </div>
          ) : (
            <p>Loading weather...</p>
          )}
        </div>
      ) : (
        <ul>
          {countriesToShow.map(country => (
            <li key={country.cca3}>
              {country.name.common}
              <button type="button" onClick={() => handleShowCountry(country)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
