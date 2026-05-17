import { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  if (props.total === 0) {
    return (
      <div>
        no feedback yet
      </div>
    )
  }
}

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0) 

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAverage((updatedGood - bad) / (updatedGood + neutral + bad))
    setPositive(updatedGood / (updatedGood + neutral + bad) * 100 + ' %')
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    setAverage((good - updatedBad) / (good + neutral + updatedBad))
    setPositive(good / (good + neutral + updatedBad) * 100 + ' %')
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <h1>statistics</h1>
      <Statistics/>
      <p>good {good} <br />neutral {neutral} <br /> bad {bad} 
      <br /> all {total} <br /> average {average} <br/> positive {positive} </p>
    </div>
  )
}

export default App