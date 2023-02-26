import React from 'react'
import { useContext} from 'react';
import TodoContext from '../context/todo/TodoContext';

const TodoItem = (props) => {
  const { title, description } = props;
  const context=useContext(TodoContext);
  const {deleteTodo}=context;


  const handleDelete=(ev)=>{
    ev.preventDefault();
    deleteTodo(props.id);
    props.showAlert(true,"Task has deleted");
  }

  return (
    <div style={{ "fontFamily": "consolas" }}>
      <div className="todoitem-container">
        <div className='todoitem-com-1' ><h3>{title}</h3></div>
        <div className='todoitem-com-2'><h3>{description}</h3></div>
        <div className='todoitem-com-3'><i className=" fa fa-regular fa-trash-can fa-2x" onClick={handleDelete}></i></div>
      </div>
    </div>
  )
}

export default TodoItem