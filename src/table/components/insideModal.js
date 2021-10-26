import React, {  } from 'react';
import SubmitButton from '../../login/components/submitButton';

export const ModalContainer = props => (
  <div className="modal d-block full-screen-popup" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title text-center bold">Accept Event</h3>
          <button type="button" className="close" onClick={props.onClose}>
            <span className="icon-close" />X
          </button>
        </div>
        <div className="modal-body">
        <tbody>
          <tr>
            <td>Event Name</td>
            <td>{props.eventName}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{props.location}</td>
          </tr>
          <tr>
            <td>HR Name</td>
            <td>{props.hr_name}</td>
          </tr>
          <tr>
            <td>Choose date</td>
            <td><input key={0} type="radio" name='date' 
              value={props.date1}
              onChange={(val) => {props.onClick(val)}} />{props.date1}</td>
          </tr>
          <tr>
            <td></td>
            <td><input key={1} type="radio" name='date' 
              value={props.date2}
              onChange={(val) => {props.onClick(val)}} />{props.date2}</td>
          </tr>
          <tr>
            <td></td>
            <td><input key={2} type="radio" name='date' 
              value={props.date3}
              onChange={(val) => {props.onClick(val)}} />{props.date3}</td>
          </tr>
        </tbody>
        <SubmitButton
          text='Accept'
          onClick={() => props.acceptEvent()}
          />
        </div>
      </div>
    </div>
  </div>
);

export const ModalContainerReject = props => (
  <div className="modal d-block full-screen-popup" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title text-center bold">Reject</h3>
          <button type="button" className="close" onClick={props.onClose}>
            <span className="icon-close" />X
          </button>
        </div>
        <div className="modal-body">
        <tbody>
          <tr>
            <td>Reason</td>
            <td><input
                    className = 'input'
                    type = 'text'
                    placeholder = 'input your reason'
                    value = {props.reason ? props.reason : ''}
                    onChange = {(val) => props.setValueText(val)}
                /></td>
          </tr>
        </tbody>
        <SubmitButton
          text='Reject'
          onClick={() => props.rejectEvent()}
          />
        </div>
      </div>
    </div>
  </div>
);

export const ModalContainerHR = props => (
  <div className="modal d-block full-screen-popup" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h6 className="modal-title text-center bold">{props.eventName}</h6>
          <button type="button" className="close" onClick={props.onClose}>
            <span className="icon-close" />X
          </button>
        </div>
        <div className="modal-body">
        <tbody>
          <tr>
            <td>Event Name</td>
            <td>{props.name}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{props.status}</td>
          </tr>
          <tr>
            <td>Confirmed</td>
            <td>{props.confirmed}</td>
          </tr>
          <tr>
            <td>Choosen Date</td>
            <td>{props.chosenDate}</td>
          </tr>
          <tr>
            <td>Date Confirmed</td>
            <td>{props.dateConfirmed}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{props.location}</td>
          </tr>
        </tbody>
        </div>
      </div>
    </div>
  </div>
);

// export default ModalContainer, ModalContainerReject;