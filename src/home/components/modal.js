import React, { Component } from 'react';
import InputField from './components/inputField';
import userStore from '../store/userStore';
import SubmitButton from './components/submitButton';
import { parentURL } from '../global/constants';


class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false,
            is_hr: 0,
            events: []
        }
    }

    setInputValue(property, val){
        val = val.trim();
        if(val.length > 12) {
            return;
        }
        this.setState({
            [property]: val
        });
    }

    resetForm(){
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    async doLogin(){
        if (!this.state.username){
            return;
        }
        if (!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled: true
        });

        try {
            let res = await fetch(parentURL+'/login', {
                method: 'post',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json()
            console.log(result.data)
            if(result && result.data != null){
                userStore.isLoggedIn = true;
                userStore.username = result.data.name;
                userStore.events = result.data.events;
                userStore.is_hr = result.data.is_hr
                // alert(result.msg);
                alert('BERHASIL')
            }
            else if(result && result.data == null){
                this.resetForm();
                // alert(result.data);
                alert('GAGAL')
            }
        } catch (error) {
            console.log(error);
            this.resetForm();
        }
    }
    render() {
        const { characters } = this.state;
        console.log(this.state.userName)
        
        return (
            <div className="loginForm">
               Login Form
               <InputField
                type='text'
                placeholder='Username'
                value = {this.state.username ? this.state.username : ''}
                onChange = {(val) => this.setInputValue('username', val)}
               />
               <InputField
                type='password'
                placeholder='Password'
                value = {this.state.password ? this.state.password : ''}
                onChange = {(val) => this.setInputValue('password', val)}
               />
               <SubmitButton
                text='Login'
                disabled={this.state.buttonDisabled}
                onClick={() => this.doLogin()}
               />
            </div>
        );
    }
}

export default LoginForm;