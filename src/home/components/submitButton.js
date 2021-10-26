import React, { Component } from 'react';


class SubmitButton extends Component {
    render() {
        
        return (
            <div className="submit">
                <button
                    className = 'button'
                    disabled = {this.props.disabled}
                    onClick = {() => this.props.onClick()}
                >
                {this.props.text}
                </button>
            </div>
        );
    }
}

export default SubmitButton;