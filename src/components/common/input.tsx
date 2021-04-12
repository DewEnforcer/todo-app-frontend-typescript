import React from 'react';
import InputModel from '../../propModels/InputModel';

const Input = ({name, label, error, ...rest}: InputModel) => {
    return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...rest} className="form-control" name={name} id={name}/>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
    );
}
 
export default Input;