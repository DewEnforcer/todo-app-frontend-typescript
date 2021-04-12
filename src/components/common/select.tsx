import React from 'react';
import InputModel from '../../propModels/InputModel';

const Select = ({name, label, error, options, ...rest}: InputModel) => {
    return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" id={name} name={name} {...rest}>
            {options!.map((o) => {
                return <option key={o._id} value={o._id}>{o.name}</option>
            })}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
    </div>
    );
}
 
export default Select;