const PersonAddedNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="personAddedNotification">
      {message}
    </div>
  )
}

export default PersonAddedNotification