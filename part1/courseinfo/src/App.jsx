const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part part={props.parts.name} exercises={props.parts.exercises} />
      <Part part={props.parts.name} exercises={props.parts.exercises} />
      <Part part={props.parts.name} exercises={props.parts.exercises} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Number of exercises {props.parts.reduce((sum, part) => sum + part, 0)}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts[0].name} exercises={course.parts[0].exercises} />
      <Content parts={course.parts[1].name} exercises={course.parts[1].exercises} />
      <Content parts={course.parts[2].name} exercises={course.parts[2].exercises} />
      <Total parts={course.parts.map((part) => part.exercises)} />
    </div>
  )
}


export default App
