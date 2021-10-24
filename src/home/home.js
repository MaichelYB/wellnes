import React, { Component } from 'react';
import InputEvent from './components/inputEvent';
import userStore from '../store/userStore';
import SubmitButton from './components/submitButton';
import { parentURL } from '../global/constants';
import {Dropdown} from 'react-bootstrap';

class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        eventName: '',
        vendorName: '',
        proposedDate1: '',
        proposedDate2: '',
        proposedDate3: '',
        proposedDates: [],
        status: 0,
        dateCreated: ''
      }
    }
    setInputValue(property, val){
      this.setState({
        [property]: val
      });
    }
    async addEvent(){
        this.setState({
            buttonDisabled: true
        });
        try {
            let res = await fetch(parentURL+'/createEvent', {
                method: 'post',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
                body: JSON.stringify({
                    eventName: this.state.eventName,
                    vendorName: this.state.vendorName,
                    proposedDates: [this.state.proposedDate1, this.state.proposedDate2, this.state.proposedDate3],
                    status: 0,
                    dateCreated: this.state.dateCreated
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
            <div className="addEvent">
               Add Event
               <InputEvent
                type='text'
                placeholder='eventName'
                value = ''
                onChange = {(val) => this.setInputValue('eventName', val)}
               />
               <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
               <InputEvent
                type='password'
                placeholder='Password'
                value = {this.state.password ? this.state.password : ''}
                onChange = {(val) => this.setInputValue('password', val)}
               />
               <InputEvent
                text='Login'
                disabled={this.state.buttonDisabled}
                onClick={() => this.doLogin()}
               />
            </div>
        );
    }
}

export default Home;