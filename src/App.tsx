import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router';

import Todos from './components/Todos';
import Header from './components/Header';
import Logout from './components/Logout';

import './App.css';
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <div className="App">
        <Header/>
        <ToastContainer/>
        <div className="content">
          <Switch>
            <ProtectedRoute path="/todos" redirectPath="/login" component={Todos}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/logout" component={Logout}/>
            <Redirect from="/" exact to="/todos"/>
          </Switch>
        </div>
    </div>
  );
};

export default App;
