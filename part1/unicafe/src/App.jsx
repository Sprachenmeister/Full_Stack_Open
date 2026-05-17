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
  return (
    <div>
      <table style={{width: '15%', lineHeight: '0.001px'}}>
        <tbody>
        <tr>
          <td><StatisticLine text="good" /> </td>
          <td><StatisticLine value={props.good} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="neutral" /></td>
          <td><StatisticLine value={props.neutral} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="bad" /></td>
          <td><StatisticLine value={props.bad} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="all" /></td>
          <td><StatisticLine value={props.total} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="average" /></td>
          <td><StatisticLine value={props.average} /></td>
        </tr>
        <tr>
          <td><StatisticLine text="positive" /></td>
          <td><StatisticLine value={props.positive} /></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}


const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>)

const StatisticLine = (props) => {
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
   )
}

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
      <Statistics total={total} good={good} neutral={neutral} bad={bad} average={average} positive={positive}/>
    </div>
  )
}

export default App