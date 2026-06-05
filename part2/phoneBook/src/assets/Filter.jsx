const Filter = (props) => {
  return (
    <div>
      <p>filter shown with <input value={props.filter} onChange={props.handleFilterChange} /></p>
    </div>
  )
}

export default Filter