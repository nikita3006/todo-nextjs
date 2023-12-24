import TodoList from '@/Components/TodoList';
import React, { useState } from 'react'
import classes from "../Components/todo.module.css";

function index() {

    const [todos,setTodos]=useState([])
    const [newTodo,setNewTodo]= useState('');
    const [complete,setComplete]=useState([]);

    const handleAddTodo = ()=>{
        if(newTodo.trim() !== ""){
            setTodos([...todos,newTodo]);
            setNewTodo("");
        }
    };

    const handleDeleteTodo =(todo)=>{
        const updatedTodo = todos.filter((item)=>(
            item !== todo
        ))
        setTodos(updatedTodo);
    }

    const handleCompleteTodo = (todo)=>{
        const updatedTodo = todos.filter((item)=>(
            item !== todo
        ));
        setTodos(updatedTodo);
        setComplete([...complete,todo]);
    }


  return (
    <>
        <div className={classes.container}>
            <h1 className={classes.heading}>Todo</h1>
            <br />
            <input type="text" 
                className={classes.input}
                value={newTodo}
                onChange={(e)=>setNewTodo(e.target.value)}
                placeholder='Enter new todo'
            />
            <button className={classes.btn} onClick={handleAddTodo}>Add</button>
        </div>
        <hr />
        <div className={classes.list}>
            <h1>Todo List</h1>
            <TodoList todos={todos} onDelete={handleDeleteTodo} onComplete={handleCompleteTodo}/>
        </div>
        <hr />
        <div className={classes.list}>
            <h1>Complete Task</h1>
            {complete.map((todo)=> (
                <li>{todo}</li>
            ))}
        </div>
    </>
  )
}

export default index