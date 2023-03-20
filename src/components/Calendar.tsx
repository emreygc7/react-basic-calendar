import React from 'react'

interface Props {
  deneme: string
}

function Calendar(deneme: Props) {
  return (
    <div>{deneme}</div>
  )
}

export default Calendar