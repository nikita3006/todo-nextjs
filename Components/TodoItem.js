import React from 'react'
import classes from './todo.module.css'

function TodoItem({item, onDelete , onComplete}) {
  return (
    <div className={classes.listitem}>
        <span className={classes.name}>{item}</span>
        <button className={classes.deletebtn} onClick={()=> onDelete(item)}>Delete</button> 
        <button className={classes.btn} onClick={()=> onComplete(item)}>Complete</button>
    </div>
  )
}

export default TodoItem