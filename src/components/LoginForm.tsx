import React from 'react'
import Joi from "joi-browser";
import authService from '../services/authService';
import Form from './common/form';

type input = {
    name: string,
    path: string,
    label: string,
    type: string
}

interface LoginFormState {
    data: {
        username: string,
        password: string
    },
    errors: {},
    inputs: input[]
}

export default class LoginForm extends Form<LoginFormState> {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {},
        inputs: [
            {name: "username", path: "username", label: "Username", type:"text"},
            {name: "password", path: "password", label: "Password", type:"password"},
        ]
    }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    }

    doSubmit() {
        const {username, password} = this.state.data;
        authService.login(username, password);
        window.location.href = "/";
    }

    render() {
        return (
            <div className="login_box">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.inputs.map((i) => this.renderInput(i))}
                    {this.renderButton("Login")}
                </form>
            </div>
        )
    }
}
