import React, { Component } from 'react';
import api from '../services/api';
import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    handleInputChangeUsername = e => {
        this.setState({ username: e.target.value });
    };

    handleInputChangePassword = e => {
        this.setState({ password: e.target.value });
    };


    handlesSingIn = async e => {
        e.preventDefault();

        const { username } = this.state;
        const { password } = this.state;

        const request = await api.post('/user_login' , {username,password});
        console.log(username);
        console.log(password);

        if (request.data.length === 0) {
            alert('Usuário e/ou senha inválidos');
            this.setState({ password: ''});
            this.setState({ username: '' });

        }else{
            localStorage.setItem('@Twitter:username', request.data[0].username);
            this.props.history.push('/timeline');
        }
        

    }

    render(){
        return (
            <div className="login-wrapper">
            <img src={twitterLogo} alt="GoTwitter" />
            <form onSubmit = {this.handlesSingIn} >
            <input  
            value={this.state.username}
            onChange={this.handleInputChangeUsername}
            placeholder="Nome do usuário" 
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