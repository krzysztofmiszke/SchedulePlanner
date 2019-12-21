import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActualTime from './ActualTime';

const style={
    marginRight: '40px'
}

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="Logo">
                    <h1 className="Schedule">Schedule</h1>
                    <h1 className="Planner">Planner</h1>
                </div>
                <div style={style}>
                    <ActualTime />
                </div>
                
            </div>
        )
    }
}

export default Header;