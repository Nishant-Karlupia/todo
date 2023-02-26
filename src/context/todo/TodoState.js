import TodoContext from "./TodoContext";
import { useState } from "react";


const TodoState = (props) => {
  const host = "http://localhost:5000";
  const all_todos = [];

  const [todos, setTodos] = useState(all_todos);

  // get all todos
  const getAllTodos = async () => {

    // return {"todo":....} so use .todo with output 

    const response = await fetch(`${host}/todo/api/todo/fetchallTodos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = await response.json();
    // console.log(json);
    const alltodos = json.todo;
    setTodos(alltodos);
  }
  // add todo
  const addTodo = async (title, description) => {
    const response = await fetch(`${host}/todo/api/todo/addTodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title: title, description: description }),
    });
    const ntodo = await response.json();
    setTodos(todos.concat(ntodo));
  }

  // delete todo
  const deleteTodo = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/todo/api/todo/deleteTodo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });

    let todocopy = [];
    for (let item of todos) {
      if (item._id === id) continue;
      todocopy.push(item);
    }
    setTodos(todocopy);

  }




  return (
    <TodoContext.Provider value={{ todos, setTodos, getAllTodos, addTodo, deleteTodo }}>
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoState;