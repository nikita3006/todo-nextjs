import React from 'react'
import TodoItem from './TodoItem'

function TodoList({ todos, onDelete ,onComplete}) {
  return (
    <div>
        {todos.map((todo,index)=>(
            <TodoItem
                key={index}
                item={todo}
                onDelete={onDelete}
                onComplete ={onComplete}
            />
        ))}
    </div>
  )
}

export default TodoList