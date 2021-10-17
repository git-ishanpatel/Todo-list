import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import {stringify, v4 as uuidv4} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'
function App() {
const [todos, setTodos] = useState([])

const todoNameRef = useRef()
useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  if (storedTodos) setTodos(storedTodos)

}, [])

useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])

function toggleTodo(id) {
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id ===id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}
function handleAddTodo(e){
const name = todoNameRef.current.value
if (name === '') return
  setTodos(prevTodos => {
    return [...prevTodos, { id: uuidv4(), name:name, complete: false}]
  })
  todoNameRef.current.value = null

}

function handleClearTodos(){
 const newTodos = todos.filter(todo => !todo.complete)
 setTodos(newTodos)
}
  return (
    <>
    <div className='container'>
      {/* <h2>To-do List </h2> */}
   <TodoList todos = {todos} toggleTodo={toggleTodo} />
   <input className='input' ref= {todoNameRef} type="text"></input>
   <button className='btn' onClick={handleAddTodo}>Add Todo</button>
   <button className='btn' onClick= {handleClearTodos}>Clear completed Todos</button>
   <div className='todo-left'>{ todos.filter (todo => !todo.complete).length} left to do</div>
   </div>
    </>
  );
}

export default App;
