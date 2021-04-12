import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from "./input";
import Select from "./select";

interface DefaultRenderProps {
    path: string, 
    name: string, 
    label: string, 
    type: string
}

class Form extends Component {//use loginform etc to inherit from this class, requires doSubmit
    schema: any = {};

    state = {
        data: {},
        errors: {}
    }
    renderInput = ({path, name, label, type}: DefaultRenderProps) => {
        const {data, errors}: {data: any, errors: any} = this.state;
        return <Input key={path} name={name} type={type} label={label} value={data[path]} error={errors[path]} onChange={this.handleChange} />
    }
    renderSelect = ({path, name, label, type}: DefaultRenderProps, options: any) => {
        const {data, errors}: {data: any, errors: any} = this.state;
        return <Select key={path} options={options} name={name} type={type} label={label} value={data[path]} error={errors[path]} onChange={this.handleChange} />        
    }
    renderButton = (label: string) => {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>{label}</button>
        )
    }
    validate = () => {
        const valOptions = {abortEarly: false, allowUnknown: true};
        const {error} = Joi.validate(this.state.data, this.schema, valOptions);
        if (!error) return null;
        const errors: any = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    validatePropery = ({name, value}: {name: string, value: any}) => {
        const toValObj = {[name]: value};
        const subSchema = {[name]: this.schema[name]};
        const {error} = Joi.validate(toValObj, subSchema);
        return error ? error.details[0].message : null;
    }
    handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}});
        if (errors) return;    
        this.doSubmit(); //here do submit
    }
    handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const {currentTarget: input} = ev; 
        const errors: any = {...this.state.errors};
        const errorMessage = this.validatePropery(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data: any = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    }
    doSubmit() {
        throw new Error("doSubmit func not implemented!")
    }
}
 
export default Form;