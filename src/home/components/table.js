import React, { Component } from 'react';
import InputField from './components/inputField';
import userStore from '../store/userStore';
import SubmitButton from './components/submitButton';
import { parentURL } from '../global/constants';


class Table extends Component {
    constructor(props){
        super(props);
        this.state = userStore
    }
    render() {
      const { characters } = this.state;
      console.log(this.state.userName)
      
      return (
          <div className="tableEvent">
              <table>
                <tr>
                  <th>Event Name</th>
                  <th>Vendor Name</th>
                  <th>Proposed Date 1</th>
                  <th>Proposed Date 2</th>
                  <th>Proposed Date 3</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </table>
          </div>
      );
    }
}

export default LoginForm;