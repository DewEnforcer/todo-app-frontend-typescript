import React from 'react'

interface Props {
    value: string,
    onClick: () => void,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TodoInput: React.FC<Props> = ({value, onChange, onClick}) => {
    return (
        <div className="new_todo_box">
            <input type="text" value={value} onChange={onChange} placeholder="Describe your next todo..."></input>
            <button className="btn btn-primary" onClick={onClick}>Add TODO!</button>
        </div>
    );
}

export default TodoInput