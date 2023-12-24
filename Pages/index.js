import React, { useState,useEffect } from 'react'
import classes from "../Components/todo.module.css";

function index() {

    const [todos,setTodos]=useState([])
    const [newTodo,setNewTodo]= useState('');

    const handleAddTodo = async ()=>{
        if(newTodo.trim() !== ""){
            setTodos([...todos,{text:newTodo, completed: false}]);
            setNewTodo("");
            try {
                const res = await fetch("/api/todos", {
                  method: "POST",
                  body: JSON.stringify({ todo: newTodo, completed: false }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (res.ok) {
                  console.log("Todo item added successfully!");
                } else {
                  console.error("Failed to add todo item.");
                }
              } catch (error) {
                console.error("Error adding todo item:", error);
              }
            }
          };

    const handleDeleteTodo = async (todo)=>{
        try {
            const res = await fetch("/api/todos", {
              method: "DELETE",
              body: JSON.stringify({ todo }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              console.log("Todo item deleted successfully!");
              setTodos(todos.filter((item) => item.text !== todo));
            } else {
              console.error("Failed to delete todo item.");
            }
          } catch (error) {
            console.error("Error deleting todo item:", error);
          }
    }

    const handleCompletedTodo = async (todo) => {
        try {
          const res = await fetch("/api/todos", {
            method: "DELETE",
            body: JSON.stringify({ todo }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            console.log("Todo item deleted successfully!");
            setTodos(todos.filter((item) => item.text !== todo));
          } else {
            console.error("Failed to delete todo item.");
          }
        } catch (error) {
          console.error("Error deleting todo item:", error);
        }
    
        try {
          const res = await fetch("/api/completedtodos", {
            method: "POST",
            body: JSON.stringify({ todo }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            console.log("Completed Todo item added successfully!");
          } else {
            console.error("Failed to add completed todo item.");
          }
        } catch (error) {
          console.error("Error adding completed todo item:", error);
        }
      };


      const fetchTodos = async () => {
        try {
          const res = await fetch("/api/todos");
          if (res.ok) {
            const data = await res.json();
            setTodos(data.todos);
          } else {
            console.error("Failed to fetch Todos.");
          }
        } catch (error) {
          console.error("Error fetching Todos:", error);
        }
      };
    
      useEffect(() => {
        fetchTodos();
      }, []);

  return (
    <>
        <div className={classes.container}>
            <h1 className={classes.heading}>Todo List</h1>
            <br />
            <input type="text" 
                className={classes.input}
                value={newTodo}
                onChange={(e)=>setNewTodo(e.target.value)}
                placeholder='Enter new todo'
            />
            <button className={classes.btn} onClick={handleAddTodo}>Add</button>
        </div>
        <div className={classes.list}>
            {todos.map((todo, index) => (
            <div
                key={index}
                className={`${classes.listitem} ${
                todo.completed ? classes.completed : ""
                }`}
            >
                <span className={classes.name}>{todo.text}</span>
                <button
                className={classes.deletebtn}
                onClick={() => handleDeleteTodo(todo.text)}
                >
                Delete
                </button>
                <button
                className={classes.btn}
                onClick={() => handleCompletedTodo(todo.text)}
                >
                Done
                </button>
            </div>
            ))}
        </div>
    </>
  )
}

export default index