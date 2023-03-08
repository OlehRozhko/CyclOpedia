import React, { useEffect } from 'react'

const Instructor = props => {
  return (
    <div>
      Name: {props.instructor ? props.instructor.name : null}
      <br />
      Email: {props.instructor ? props.instructor.email : null}
      <br />
      Phone: {props.instructor ? props.instructor.phone : null}
      <br />
    </div>
  )
}

export default Instructor