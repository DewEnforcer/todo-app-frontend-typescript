import React from 'react'
import Joi from "joi-browser";

import Form from './common/form';
import { register } from '../services/userService';
import { toast } from 'react-toastify';

type input = {
    name: string,
    path: string,
    label: string,
    type: string
}

interface RegisterFormState {
    data: {
        username: string,
        password: string,
        email: string
    },
    errors: {},
    inputs: input[]
}

export default class LoginForm extends Form<RegisterFormState> {
    state = {
        data: {
            username: "",
            password: "",
            email: ""
        },
        errors: {},
        inputs: [
            {name: "username", path: "username", label: "Username", type:"text"},
            {name: "email", path: "email", label: "E-mail", type:"text"},
            {name: "password", path: "password", label: "Password", type:"password"},
        ]
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
        email: Joi.string().email().required().label("E-mail"),
    }


    doSubmit() {
        const {username, password, email} = this.state.data;
        const regStatus = register(username, password, email);
        if (regStatus) return window.location.href = "/";
        toast.error("An error during sign-up has occured, please try again!");
    }

    render() { 
        return (
            <div className="login_box">
                <h2>Signup</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.inputs.map(i => this.renderInput(i))}
                    {this.renderButton("Signup")}
                </form>
            </div>
        )
    }
}
