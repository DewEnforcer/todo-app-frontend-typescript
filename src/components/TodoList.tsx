import React from 'react';
import Todo from "./Todo";
import TodoListProps from "../propModels/TodoList";

const TodoList: React.FC<TodoListProps> = props => {
  const {items: todos} = props;

  return (
    <ul>
      {todos.map((t) => <Todo key={t._id} todo={t}/>)}
    </ul>
  );
};

export default TodoList;
