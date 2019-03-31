import React, { Component } from 'react';

import api from '../services/api';
import twitterLogo from '../twitter.svg';
import './SingUp.css';

export default class SingUp extends Component {
    state = {
        username: "",
        email: "",
        password: ""

    };

    handleInputChangeUsername = e => {

        this.setState({ username: e.target.value });
    };

    handleInputChangeEmail = e => {

        this.setState({ email: e.target.value });
    };

    handleInputChangePassword = e => {

        this.setState({ password: e.target.value });
    };

    handleSubmit = async e => {
        e.preventDefault();

        //console.log(this.state);

        const { username } = this.state;
        const { email } = this.state;
        const { password } = this.state;

        if(!username.length && !email.length && !password.length) return;

        await api.post('users' , {username, password, email})

        //localStorage.setItem('@GoWeek:username', username);

        this.props.history.push('/');
    };

    render(){
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit = {this.handleSubmit} >
                    <input  
                        value={this.state.username}
                        onChange={this.handleInputChangeUsername}
                        placeholder="Nome do usuário" 
                    /> 
                    <input  
                        value={this.state.email}
                        onChange={this.handleInputChangeEmail}
                        placeholder="Email" 
                    />
                    <input  
                        value={this.state.password}
                        onChange={this.handleInputChangePassword}
                        placeholder="Senha" 
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}