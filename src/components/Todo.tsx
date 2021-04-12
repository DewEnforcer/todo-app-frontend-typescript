import React, {useContext} from 'react';

import TodoContext from '../context/TodoContext';
import TodoInterface from "../propModels/Todo.interface";

interface Props {
  todo: TodoInterface,
}

const Todo: React.FC<Props> = ({todo}) => {
  const todoContext = useContext(TodoContext);

  const cls = todo.finished ? "todo_done" : "";
  const clsBtn = todo.finished ? "btn btn-success" : "btn btn-danger";

    return (
    <div className="todo_container">
        <span className={cls}>{todo.description}</span>
        <input type="checkbox" checked={todo.finished} onChange={() => todoContext!.onChange(todo._id)}></input>
        <button className={clsBtn} onClick={() => todoContext!.onDelete(todo._id)}>Delete</button>
    </div>
  )  
}

export default Todo;