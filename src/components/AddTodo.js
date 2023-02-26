import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import TodoContext from '../context/todo/TodoContext';

const AddTodo = (props) => {
  const [ntodo, setNtodo] = useState({title:"",description:""});
  const context=useContext(TodoContext);
  const {addTodo}=context;

  const handleSubmit=async(ev)=>{
    ev.preventDefault();
    addTodo(ntodo.title,ntodo.description);
    setNtodo({title:"",description:""});
    props.showAlert(true,"New task added successfully");

  }

  const onchange=(ev)=>{
    setNtodo({...ntodo,[ev.target.name]:ev.target.value});
  }


  return (
    <div className='addtodo-container' >
      <h1 style={{ textAlign: "center","fontFamily":"consolas" }}>Add a task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <i className="fa fa-regular fa-keyboard"></i> <span></span>
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder='title' minLength="3" value={ntodo.title} onChange={onchange}/>
        </div>
        <div className="mb-3">
        <i className="fa fa-thin fa-file-medical"></i> <span></span>
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' placeholder='add a small description' minLength="5" value={ntodo.description} onChange={onchange} />
        </div>
        <button type="submit" className="btn w-100">Add task</button>
      </form>
    </div>
  )
}

export default AddTodo