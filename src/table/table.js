import React, { Component } from 'react';
import { parentURL } from '../global/constants';
// import { Modal } from 'react-bootstrap';
import Modal from './components/modal'
import {ModalContainer, ModalContainerHR} from './components/insideModal';
import {ModalContainerReject} from './components/insideModal';


class Table extends Component {
    constructor(props){
      super(props);
      this.state = {
        event: [],
        dates: [],
        showModal: false,
        setIsOpen: false,
        accept: false,
        reason:'',
        eventName: '',
        confirmed: 0,
        status: 0,
        chosenDate: '',
        dateConfirmed: '',
        remarks: '',
        isloading: true,
        id: '',
        isdetails: false,
        index: 0,
        hr: '',
        setIsOpenDetails: false
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.setValueText = this.setValueText.bind(this)
    }
    async componentWillMount() {
      var listEvents = []
      let listEvent = await fetch(parentURL+'/users?id='+sessionStorage.getItem('user_id'), {
        method: 'GET',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        }
      });
      let eventRes = await listEvent.json()
      eventRes['data']['events'].forEach(element => {
        listEvents.push(element)
      });
      await sessionStorage.setItem('events', JSON.stringify(listEvents));
      let res = await fetch(parentURL+'/allUserEvents', {
        method:'POST',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: sessionStorage.getItem('events')
      });
      let result = await res.json();
      result['data'].forEach(element => {
        this.state.event.push(element);
      });
      // await this.setState({isloading: true});
      await this.setState({'isloading': false})
    }
    
    async openModal(e, is_true, is_details) {
      let res = await fetch(parentURL+'/events?id='+e.target.getAttribute('data-item'), {
        method: 'get',
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
      });
      let result = await res.json()
      this.setState({'index': e.target.value})
      if(result && result.data != null){
        this.setState({
          'eventName': result['data']['eventName'],
          'confirmed': result['data']['confirmed'],
          'status': result['data']['status'],
          'chosenDate': result['data']['chosenDate'],
          'dateConfirmed': result['data']['dateConfirmed'],
          'remarks': result['data']['remarks'],
          'id': result['data']['_id'],
          'dates': result['data']['proposedDates'],
          'hr': result['data']['hr']['name'],
          'location': result['data']['location']
        })
        if(is_details){
          this.setState({
            'setIsOpenDetails': true,
            'isdetails': true
          });
        }
        else{
          if(is_true){
            this.setState({
              'setIsOpen': true,
              'accept': true
            });
          }
          else{
            this.setState({
              'setIsOpen': true,
              'accept': false
            });
          }
        }
      }
      else if(result && result.data == null){
          this.resetForm();
          // alert(result.data);
          alert('FAIL')
      }
    }

    resetForm(){
      this.setState( {
        event: [],
        dates: [],
        showModal: false,
        setIsOpen: false,
        accept: false,
        reason:'',
        eventName: '',
        confirmed: 0,
        status: 0,
        chosenDate: '',
        dateConfirmed: '',
        remarks: '',
        isloading: true,
        id: '',
        isdetails: false,
        index: 0,
        hr: ''
      })
    }

    setValueText(val){
      this.setState({
          reason: val.target.value
      });
    }

    acceptEvent = async(e) => {
      let res = await fetch(parentURL+'/updateAccepted', {
        method: 'POST',
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify({
          'id': this.state.id,
          'dateSelected': this.state.chosenDate
        })
      });
      let result = await res.json()
      if(result && result.data != null){
        alert('DONE')
        window.location.reload()
      }
      else if(result && result.data == null){
        // this.resetForm();
        // alert(result.data);
        alert('FAIL')
        window.location.reload()
      }
    }
    onClick = async(e) => {
      await this.setState({
        'chosenDate': e.target.value
      })
    }
  
    closeModal() {
      this.setState({setIsOpen: false, accept: false, isdetails: false, setIsOpenDetails: false});
    }

    rejectEvent = async() => {
      var reason = await this.state.reason
      var id = await this.state.id

      let res = await fetch(parentURL+'/updateRejected', {
        method:'POST',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify({
          "id": id,
          "remarks": reason,
          "dateConfirmed": Date.now(),
          "status": 0,
          "confirmed": 1,
        })
      });
      let result = await res.json();
      if(result && result['data'] != null){
        window.alert('EVENT REJECTED')
        this.resetForm()
      }
      else{
        window.alert('ERROR')
        this.resetForm()
      }
    }

    renderModalDetails = () => {
      if (this.state.setIsOpenDetails && this.state.isdetails) {
        var status = ''
          var confirmed = ''
          if(this.state.status === 0){
            if(this.state.confirmed === 0){
              status = 'On progress'
              confirmed = 'Not confirmed'
            }
            else{
              status = 'Rejected'
              confirmed = 'Confirmed'
            }
          }else{
            status = 'Accepted'
            confirmed = 'Confirmed'
          }
        return(
          <Modal>
            <ModalContainerHR 
                onClose={this.closeModal}
                name={this.state.eventName}
                status={status}
                confirmed={confirmed}
                chosenDate={this.state.chosenDate}
                dateConfirmed={this.state.dateConfirmed}
                location={this.state.location}
                remarks={this.state.remarks}/>
          </Modal>
        )
      }
    }

    renderImageModal = () => {
      if (this.state.setIsOpen && this.state.accept && !this.state.isdetails) {
        if(sessionStorage.getItem('is_hr')==="1"){
          var status = ''
          var confirmed = ''
          if(this.state.status === 0){
            if(this.state.confirmed === 0){
              status = 'On progress'
              confirmed = 'Not confirmed'
            }
            else{
              status = 'Rejected'
              confirmed = 'Confirmed'
            }
          }else{
            status = 'Accepted'
            confirmed = 'Confirmed'
          }
          return(
            <Modal>
              <ModalContainerHR 
                onClose={this.closeModal}
                name={this.state.eventName}
                status={status}
                confirmed={confirmed}
                chosenDate={this.state.chosenDate}
                dateConfirmed={this.state.dateConfirmed}
                location={this.state.location}
                remarks={this.state.remarks}/>
            </Modal>
          )
        }
        return (
          <Modal>
            <ModalContainer onClose={this.closeModal} 
            date1={this.state.dates[0]}
            date2={this.state.dates[1]} 
            date3={this.state.dates[2]}
            eventName={this.state.eventName}
            hr_name={this.state.hr}
            location={this.state.location}
            onClick={(e)=>{this.onClick(e)}}
            acceptEvent={(e) => {this.acceptEvent(e)}}
            />
          </Modal>);
      }
      else if(this.state.setIsOpen && !this.state.accept && !this.state.isdetails){
        return(
          <Modal>
            <ModalContainerReject onClose={this.closeModal} setValueText={this.setValueText} reason={this.state.reason} rejectEvent={this.rejectEvent}/>
          </Modal>
        )
      }
      return null;
    }
    render() {
      if(this.state.isloading === true){
        return(
          <div className="tableEvent">Please wait</div>
        )
      }
      return (
          <div className="tableEvent">
            <h1>Not Yet Confirmed</h1>
              <table>
                <tr>
                  <th>Event Name</th>
                  <th>Vendor Name</th>
                  <th>HR Name</th>
                  <th>Proposed Date 1</th>
                  <th>Proposed Date 2</th>
                  <th>Proposed Date 3</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
                {this.state.event.map(
                  ({ _id, eventName, hr, proposedDates, vendor, status, confirmed, dateCreated }, index) => {
                    // this.state.dates.push(proposedDates)
                    var stat = (status === 0)? 'On Progress' : 'Done'
                    if(confirmed === 0){
                      return(
                      <tr key={index}>
                      <td>{eventName}</td>
                      <td>{vendor.name}</td>
                      <td>{hr.name}</td>
                      <td>{proposedDates[0]}</td>
                      <td>{proposedDates[1]}</td>
                      <td>{proposedDates[2]}</td>
                      <td>{stat}</td>
                      <td>{dateCreated}</td>
                      {/* <td><button  data-item={_id} onClick={(val) => this.openModal(val)}>Edit</button></td> */}
                      <td><button  data-item={_id} value={index} onClick={(val) => { 
                        if(sessionStorage.getItem('is_hr') === "1"){
                          this.openModal(val, true)
                        }else{
                        if (window.confirm('Accept this event?')) {
                          this.openModal(val, true)
                          } 
                          else{
                            this.openModal(val, false)
                            } }} } >View</button></td>
                      {this.renderImageModal()}
                      </tr>)
                    }
                  } 
                    )}
              </table>
              <br/>
              <h1>Confirmed</h1>
              <table>
                <tr>
                  <th>Event Name</th>
                  <th>Vendor Name</th>
                  <th>HR Name</th>
                  <th>Accepted Date</th>
                  <th>Confirmed</th>
                  <th>Status</th>
                  <th>Date Confirmed</th>
                  <th>Action</th>
                </tr>
                {this.state.event.map(
                  ({ _id, eventName, hr, vendor, status, confirmed, dateConfirmed, chosenDate }, index) => {
                    if(confirmed === 1){
                      return(
                      <tr key={index}>
                      <td>{eventName}</td>
                      <td>{vendor.name}</td>
                      <td>{hr.name}</td>
                      <td>{chosenDate}</td>
                      <td>{(confirmed === 0)? 'On Process' : 'Done'}</td>
                      <td>{(status === 0)? 'Rejected' : 'Accepted'}</td>
                      <td>{dateConfirmed}</td>
                      {/* <td><button  data-item={_id} onClick={(val) => this.openModal(val)}>Edit</button></td> */}
                      <td><button  data-item={_id} value={index} onClick={(val) => { 
                        this.openModal(val, true, true)
                        } } >View</button></td>
                      {this.renderModalDetails()}
                      </tr>)
                    }
                  } 
                    )}
              </table>
          </div>
      );
    }
}

export default Table;