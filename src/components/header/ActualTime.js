import React, { Component } from 'react';

class ActualTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                date: new Date()
            })
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        const todayIs = new Date();
        const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const day = String(todayIs.getDate())
        const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const hours = String('0' + todayIs.getHours()).slice(-2)
        const minutes = String('0' + todayIs.getMinutes()).slice(-2)
        const seconds = String('0' + todayIs.getSeconds()).slice(-2)
        return (weekDay[todayIs.getDay()] + ', ' + day + ' ' + monthName[todayIs.getMonth()] + ' ' + hours + ':' + minutes + ':' + seconds)
    }
}
    
export default ActualTime;