import React from 'react'
import Todo from './Todo'
const TodoList = ({todos, toggleTodo}) => {
    return (
       todos.map(todo => {
           return <Todo key={todo} toggleTodo={toggleTodo} todo={todo} />
       })
    )
}

export default TodoList
