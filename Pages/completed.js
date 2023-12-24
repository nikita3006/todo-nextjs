import React, { useState,useEffect } from 'react'
import classes from "../Components/todo.module.css";

function Completedtodo() {

    const [completedtodo,setCompletedTodos] = useState([]);

    const fetchCompletedTodos = async () => {
        try {
          const res = await fetch("/api/completedtodos");
          if (res.ok) {
            const data = await res.json();
            setCompletedTodos(data.todos);
          } else {
            console.error("Failed to fetch completed todos.");
          }
        } catch (error) {
          console.error("Error fetching completed todos:", error);
        }
      };
    
      useEffect(() => {
        fetchCompletedTodos();
      }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Completed Task</h1>
      <ul className={classes.list}>
        {completedtodo.map((todo, index) => (
          <li key={index} className={classes.listitem}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Completedtodo