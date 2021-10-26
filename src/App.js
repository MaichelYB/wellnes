import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UserStore from './store/userStore';
import LoginForm from '../src/login/loginForm';
import SubmitButton from '../src/login/components/submitButton';
import Home from './home/home';
import Table from '../src/table/table'
import logout from './global/logout';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

class App extends Component {
    async componentDidMount(){
        try {
            var loggedIn = sessionStorage.getItem('is_loggedin');
            sessionStorage.setItem('home', '0')
            if (loggedIn === 1){
                sessionStorage.setItem('')
            }
            sessionStorage.setItem('loading', false)
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
        }
    }

    doLogout(){
        sessionStorage.clear()
        sessionStorage.setItem('is_loggedin', '0')
        window.location.reload()
    }

    pageRouter(){
        if(sessionStorage.getItem('is_hr') === "0"){
            return(
            <Router>
            <div className="app">
                <ul className="App-header">
                <li>
                    <Link to="/">Home</Link>
                </li>
                </ul>
                <div className="logout">
                    <SubmitButton
                        text='Logout'
                        onClick={logout}
                    />
                </div>
                {/* <Table/>
                <div className="logout">
                    <SubmitButton
                        text='Logout'
                        onClick={logout}
                    />
                </div> */}
                <Switch>
                <Route exact path='/' component={Table}></Route>
                <Route exact path='/addEvent' component={Home}></Route>
                </Switch>
            </div>
            </Router>
            )
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
            if(sessionStorage.getItem('is_loggedin') === "true"){
                if(sessionStorage.getItem('is_hr') === "1"){
                    return (
                        <Router>
                        <div className="app">
                            <ul className="App-header">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/addEvent">Add Event</Link>
                            </li>
                            </ul>
                            <div className="logout">
                                <SubmitButton
                                    text='Logout'
                                    onClick={logout}
                                />
                            </div>
                            {/* <Table/>
                            <div className="logout">
                                <SubmitButton
                                    text='Logout'
                                    onClick={logout}
                                />
                            </div> */}
                            <Switch>
                            <Route exact path='/' component={Table}></Route>
                            <Route exact path='/addEvent' component={Home}></Route>
                            </Switch>
                        </div>
                        </Router>
                    );
                }
                else{
                    return (
                        <Router>
                        <div className="app">
                            <ul className="App-header">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            </ul>
                            <div className="logout">
                                <SubmitButton
                                    text='Logout'
                                    onClick={logout}
                                />
                            </div>
                            {/* <Table/>
                            <div className="logout">
                                <SubmitButton
                                    text='Logout'
                                    onClick={logout}
                                />
                            </div> */}
                            <Switch>
                            <Route exact path='/' component={Table}></Route>
                            <Route exact path='/addEvent' component={Home}></Route>
                            </Switch>
                        </div>
                        </Router>
                    );
                }
            }
        }
        return (
            <div className="app">
                <div className="container">
                    <LoginForm/>
                </div>
            </div>
        );
    }
}

export default observer(App);