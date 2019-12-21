import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const today = new Date();
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

class CurrentMonth extends Component {
    render() {
        return <div className='month'>{monthName[today.getMonth()].toUpperCase()}</div>
    }
}

export default CurrentMonth;