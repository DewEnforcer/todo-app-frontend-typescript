import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import Joi from "joi-browser";

import TodoInterface from "../propModels/Todo.interface";
import { createTodo, getTodos, saveTodo, removeTodo } from '../services/todoservice';
import TodoList from '../components/TodoList';
import TodoContext from "../context/TodoContext"
import TodoInput from './TodoInput';


interface Props {

}

const Todos: React.FC<Props> = () => {
    const [todos, setTodos] = useState<TodoInterface[]>([])
    const [newTodo, setNewTodo] = useState("");
    const schema = {
        description: Joi.string().min(3).required(),
        finished: Joi.boolean().required()
    }

    const fetchTodos = async () => {
        try {
            const {data} = await getTodos();
            setTodos(data);
        } catch (error) {
            toast.error("An error has occured while retrieving your todos:(")
        }
    }

    const handleSubmitTodo = async () => {
        let todoObj = {
          description: newTodo,
          finished: false
        }
    
        const {error} = Joi.validate(todoObj, schema)
        if (error) return;
        try {
          const {data} = await createTodo(todoObj);
          const newTodos = [...todos];
          newTodos.push(data);
          setTodos(newTodos); 
        } catch (error) {
          if (error.response && error.response.status === 400) return toast.error(error.response.data);
        }
      }
      const handleToggleTodo = async (id: string) => {
        const newTodos = [...todos];
        const todo = newTodos.find((t) => t._id === id)
        console.log(todo);
        if (!todo) return;
    
        todo.finished = !todo.finished;
    
        await saveTodo(id, todo);
    
        setTodos(newTodos);
      }
      const handleDeleteTodo = async (id: string) => {
        const todoCopy = [...todos];
        const newTodos = todoCopy.filter((t) => t._id !== id);
    
        setTodos(newTodos);
    
        try {
          await removeTodo(id);
        } catch (error) {
          setTodos(todoCopy);
          if (error.response && error.response.status === 404) toast.error(error.response.data);
        }
      }
      const handleNewTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
      }

    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <>
            <TodoContext.Provider value={{onChange: handleToggleTodo, onDelete: handleDeleteTodo}}>
                <TodoInput onClick={handleSubmitTodo} onChange={handleNewTodoChange} value={newTodo}/>
                <TodoList items={todos}/>
            </TodoContext.Provider>
        </>
    )
}

export default Todos