import React, { Component } from 'react';
import Instructor from './Instructor';
import { getRandomUser } from './utility/api';

export class CyclopediaClassPage extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('cyclopediaState')) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: '',
      inputFeedback: '',
    };
  }

  componentDidMount = async () => {
    if (JSON.parse(localStorage.getItem('cyclopediaState'))) {
      // this.setState(JSON.parse(localStorage.getItem('cyclopediaState')));
    } else {
      console.log('componentDidMount');
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          instructor: {
            name: `${response.data.first_name} ${response.data.last_name}`,
            email: response.data.email,
            phone: response.data.phone_number
          }
        }
      })
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');

  }

  componentDidUpdate = async (previousProps, previousState) => {
    console.log('componentDidUpdate');
    localStorage.setItem('cyclopediaState', JSON.stringify(this.state));
    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      const name = `${response.data.first_name} ${response.data.last_name}`
      this.setState((prevState) => {
        return {
          studentList: [...prevState.studentList, { name }]
        }
      })
    }
    else if (previousState.studentCount > this.state.studentCount) {
      this.setState((prevState) => {
        return {
          studentList: []
        }
      })
    }

  }

  handleAddStudent = async () => {
    this.setState(prevState => {
      return {
        studentCount: prevState.studentCount + 1,
      }
    })
  }

  handleRemoveAllStudents = () => {
    this.setState(prevState => {
      return {
        studentCount: 0,
      }
    })
  }

  handleToggleInstuctor = () => {
    this.setState(prevState => {
      return {
        hideInstructor: !prevState.hideInstructor,
      }
    })
  }
  render() {
    return (
      <div>
        <div className='p-3'>
          <span className='h4 text-success'>Instructor  </span>
          <i onClick={this.handleToggleInstuctor} className={`bi ${this.state.hideInstructor ? 'bi-toggle-off' : 'bi-toggle-on'} btn btn-success btn-sm`}></i>
          <br />
          {!this.state.hideInstructor ? (
            <Instructor instructor={this.state.instructor} />)
            : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            value={this.state.inputName}
            placeholder="Name.."
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>{" "}
          Value : {this.state.inputName}
          <br />
          <textarea
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
            placeholder="Feedback..."
          ></textarea>{" "}
          Value : {this.state.inputFeedback}
        </div>
        <div className="p-3">
          <span className='h4 text-success'>Students</span><br />
          <div>Student Count: {this.state.studentCount}</div>
          <button onClick={this.handleAddStudent} className='btn btn-success btn-sm'>Add Student</button>
          &nbsp;
          <button onClick={this.handleRemoveAllStudents} className='btn btn-danger btn-sm'>Remove All Students</button>
          {this.state.studentList.map((student, index) => {
            return (
              <div className='text-white' key={index}>{student.name}</div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CyclopediaClassPage