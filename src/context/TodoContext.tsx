import React from "react";

interface todoContext {
    onChange: (_id: string) => void,
    onDelete: (_id: string) => void,
}

const TodoContext = React.createContext<null | todoContext>(null);

export default TodoContext;
