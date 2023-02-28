import React, { Component } from 'react'

export class Instructor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    return (
      <div>
        Name: {this.props.instructor ? this.props.instructor.name : null}
        <br />
        Email: {this.props.instructor ? this.props.instructor.email : null}
        <br />
        Phone: {this.props.instructor ? this.props.instructor.phone : null}
        <br />
      </div>
    )
  }
}

export default Instructor