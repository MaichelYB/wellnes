import React, { Component } from 'react';
import InputEvent from './components/inputEvent';
import userStore from '../store/userStore';
import { parentURL } from '../global/constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from 'date-fns'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        eventName: '',
        vendor: {},
        hr: {},
        proposedDate1: setHours(setMinutes(new Date(), 30), 16),
        proposedDate2: setHours(setMinutes(new Date(), 30), 16),
        proposedDate3: setHours(setMinutes(new Date(), 30), 16),
        proposedDates: [],
        status: 0,
        dateCreated: new Date(),
        vendors: [],
        selectedOption: 'None',
        loading: false,
        startDate: new Date(),
        userStore: userStore,
        location: ''
      }
      this.addEvent = this.addEvent.bind(this);
    }
    
    async componentWillMount() {
      let res = await fetch(parentURL+'/vendors', {
        method:'GET',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
      });
      let result = await res.json();
      result['data'].forEach(element => {
        this.state.vendors.push(element);
      });
      this.setState({loading: true});
    }

    handleChange = (property, event) => {
      const selectedIndex = event.target.options.selectedIndex;
      this.setState({ 
        vendor: {"id": event.target.options[selectedIndex].getAttribute('data-key'), "name": event.target.value},
        hr: {"id": sessionStorage.getItem("user_id"), "name": sessionStorage.getItem("username")},
        selectedOption: event.target.value
      });
    }

    setStartDate = (event,i) => {
      switch (i) {
        case 1:
          this.setState({ proposedDate1: new Date(event) });
          break;
        case 2:
          this.setState({ proposedDate2: new Date(event) });
          break;
        case 3:
          this.setState({ proposedDate3: new Date(event) });
          break;
        default:
          break;
      }
    };

    setInputValue(property, val){
      this.setState({
          [property]: val
      });
    }

    resetForm() {
      this.setState({
        eventName: '',
        vendor: {},
        hr: {},
        proposedDate1: setHours(setMinutes(new Date(), 30), 16),
        proposedDate2: setHours(setMinutes(new Date(), 30), 16),
        proposedDate3: setHours(setMinutes(new Date(), 30), 16),
        proposedDates: [],
        status: 0,
        dateCreated: new Date(),
        vendors: [],
        selectedOption: 'None',
        loading: false,
        startDate: new Date(),
        location: ''
      });
    }
    
    async addEvent(){
        // this.setState({
        //     buttonDisabled: true
        // });
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
                    vendor: this.state.vendor,
                    hr: this.state.hr,
                    proposedDates: [this.state.proposedDate1, this.state.proposedDate2, this.state.proposedDate3],
                    status: 0,
                    confirmed: 0,
                    dateCreated: this.state.dateCreated,
                    confirmedDate: '',
                    location: this.state.location
                })
            });

            let result = await res.json()
            if(result && result.data != null){
                // alert(result.msg);
                alert('Event Added')
                window.location.replace('/')
            }
            else if(result && result.data == null){
                this.resetForm();
                // alert(result.data);
                alert('Failed')
            }
        } catch (error) {
            this.resetForm();
        }
    }
    render() {
        if(this.state.loading){
          return (
            <div className="addEvent">
               Add Event
               <InputEvent
                type='text'
                placeholder='eventName'
                value = {this.state.eventName ? this.state.eventName : ''}
                onChange = {(val) => this.setInputValue('eventName', val)}
               />
               <span>Select Vendor Name</span>
               <select
                value = {this.state.selectedOption}
                placeholder='selectedOption'
                onChange = {(val) => this.handleChange('selectedOption', val)}
               >
                 <option key='None' value='None' selected='true' disabled="disabled">Select Vendor Name</option>
                 {this.state.vendors.map(({ _id, name }, index) => <option key={_id} data-key= {_id} value={name} >{name}</option>)}
               </select>
               <span>Select Location</span>
               <InputEvent
                type='text'
                placeholder='location'
                value = {this.state.location ? this.state.location : ''}
                onChange = {(val) => this.setInputValue('location', val)}
               />
               {/* Date picker */}
               Please fill proposed date 1 for the event
               <DatePicker
                selected={this.state.proposedDate1}
                onChange={(date) => this.setStartDate(date, 1)}
                minDate={subDays(new Date(), -1)}
                placeholderText="Select a date"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
               />
               {/* <DatePicker
                // onChange={(val) => this.handleChange('proposedDate1', val)}
                minDate={subDays(new Date(), 0)}
                placeholderText="Select a date"
               /> */}
               Please fill proposed date 2 for the event
               <DatePicker
                selected={this.state.proposedDate2}
                onChange={(date) => this.setStartDate(date, 2)}
                minDate={subDays(new Date(), -1)}
                placeholderText="Select a date"
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
               />
               Please fill proposed date 3 for the event
               <DatePicker
                selected={this.state.proposedDate3}
                onChange={(date) => this.setStartDate(date, 3)}
                minDate={subDays(new Date(), -1)}
                showTimeSelect
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy h:mm aa"
               />
               <div className="submit">
               <button
                    className = 'button'
                    onClick = {this.addEvent}
                >
                Post Event
                </button>
              </div>
            </div>
          );
        }
        else{
          return (
            <div>Please wait</div>
          )
        }
    }
}

export default Home;