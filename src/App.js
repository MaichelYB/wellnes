import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserStore from './store/userStore';
import LoginForm from '../src/login/loginForm';
import InputField from '../src/login/components/inputField';
import SubmitButton from '../src/login/components/submitButton';


class App extends Component {
    async componentDidMount(){
        try {
            let res = await fetch('/isLoggedIn', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = true;
                UserStore.userName = result.userName
            }
            else{
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        } catch (error) {
            UserStore.loading = false;
            UserStore.isLoggedIn = false;
            console.log(error);
        }
    }

    async doLogout(){
        try {
            let res = await fetch('/logout', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            let result = await res.json();

            if (result && result.success) {
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
                UserStore.userName = ''
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        if (UserStore.loading){
            return (
                <div className="app">
                    <div className="container">
                        Loading.. Please wait..
                    </div>
                </div>
            );
        }
        else{
            if(UserStore.isLoggedIn){
                // console.log(UserStore)
                return (
                    <div className="app">
                        <div className="container">
                            {/* this is after login */}
                            Welcome {UserStore.username}
                            <SubmitButton
                                text = {'Log out'}
                                disabled = {false}
                                onClick = {() => this.doLogout()}
                            />
                        </div>
                    </div>
                );
            }
        }
        return (
            <div className="app">
                <LoginForm/>
            </div>
        );
    }
}

export default observer(App);