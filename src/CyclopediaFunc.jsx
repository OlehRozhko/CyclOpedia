import React, { Component, useEffect, useId, useRef, useState } from 'react';
import InstructorFunc from './InstructorFunc';
import { getRandomUser } from './utility/api';

const CyclopediaFunc = () => {
  const [state, setState] = useState({
    instructor: undefined,
    studentList: [],
    studentCount: 0,
    hideInstructor: false
  });

  const [inputName, setInputName] = useState('');
  const [inputFeedback, setInputFeedback] = useState('');

  const totalRender = useRef(0);
  const prevStudentCount = useRef(0);
  const inputFeedbackRef = useRef(null);
  const id = useId();

  useEffect(() => {
    console.log('componentDidMount');
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: `${response.data.first_name} ${response.data.last_name}`,
            email: response.data.email,
            phone: response.data.phone_number
          }
        }
      })
    }
    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    console.log('componentDidMount');
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [...prevState.studentList, { name: `${response.data.first_name} ${response.data.last_name}` }]
        }
      })
    }
    if (prevStudentCount.current < state.studentCount) {
      getUser();
    } else if (prevStudentCount.current > state.studentCount) {
      setState(prevState => {
        return {
          ...prevState,
          studentList: []
        }
      })
    }
  }, [state.studentCount]);

  useEffect(() => {
    totalRender.current = totalRender.current + 1;
    console.log('Render total : ', totalRender.current);
  });

  useEffect(() => {
    prevStudentCount.current = prevStudentCount.current;
  }, [state.studentCount]);

  useEffect(() => {
    inputFeedbackRef.current.focus();
    // console.log('This will be called on Intial/first Render/Mount');
  }, []);


  const handleAddStudent = async () => {
    setState(prevState => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      }
    })
  }

  const handleRemoveAllStudents = () => {
    setState(prevState => {
      return {
        ...prevState,
        studentCount: 0,
      }
    })
  }

  const handleToggleInstuctor = () => {
    setState(prevState => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      }
    })
  }
  return (
    <div>
      <div className='p-3'>
        <span className='h4 text-success'>Instructor  </span>
        <i onClick={handleToggleInstuctor} className={`bi ${state.hideInstructor ? 'bi-toggle-off' : 'bi-toggle-on'} btn btn-success btn-sm`}></i>
        <br />
        {!state.hideInstructor ? (
          <InstructorFunc instructor={state.instructor} />)
          : null}
      </div>
      <div className="p-3">Total Render: {totalRender.current}</div>
      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          id={`${id}-inputName`}
          value={inputName}
          placeholder="Name.."
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        ></input>{" "}
        <label htmlFor={`${id}-inputName`}>
          Name Value :
        </label>
        {inputName}
        <br />
        <textarea
          value={inputFeedback}
          ref={inputFeedbackRef}
          id={`${id}-inputFeedback`}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
          placeholder="Feedback..."
        ></textarea>{" "}
        <label htmlFor={`${id}-inputFeedback`}>
          Feedback Value :
        </label>
        {inputFeedback}
      </div>
      <div className="p-3">
        <span className='h4 text-success'>Students</span><br />
        <div>Student Count: {state.studentCount}</div>
        <button onClick={handleAddStudent} className='btn btn-success btn-sm'>Add Student</button>
        &nbsp;
        <button onClick={handleRemoveAllStudents} className='btn btn-danger btn-sm'>Remove All Students</button>
        {state.studentList.map((student, index) => {
          return (
            <div className='text-white' key={index}>{student.name}</div>
          )
        })}
      </div>
    </div>
  )
}



export default CyclopediaFunc

// export default CyclopediaClassPage