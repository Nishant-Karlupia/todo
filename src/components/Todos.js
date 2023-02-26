import React from 'react'
import AddTodo from './AddTodo'
import TodoItem from './TodoItem'
import TodoContext from '../context/todo/TodoContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Todos = (props) => {

  const context = useContext(TodoContext);
  const { todos, getAllTodos } = context;
  const navigate=useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      getAllTodos();
    }
    else
    {
      props.showAlert(false,"You must login to view page");
      navigate("/");
    }
    // eslint-disable-next-line
  }, [])


  return (
    // <div>
    <div className="d-flex flex-column l my-5 align-items-center " >
      <div className='todo-container'>

        <div ><AddTodo showAlert={props.showAlert}/></div>
        <div className='my-3' >
          <div className="d-flex flex-column" style={{ "color": "white" }}>
            {todos.length !== 0 ? todos.map((todo) => {
              return <TodoItem key={todo._id} id={todo._id} title={todo.title} description={todo.description} showAlert={props.showAlert} />
            }) : "nothing to display"}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Todos