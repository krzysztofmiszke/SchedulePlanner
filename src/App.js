// import React from "react";
// import { render } from "react-dom";
// import Header from './components/header/Header';
// import LeftSection from './components/sections/LeftSection';
// import UserIco from './components/sections/UserIco';
// import Footer from './components/footer/Footer';
// import './App.css';
// import Paper from "@material-ui/core/Paper";
// import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
// import {
//   Scheduler,
//   WeekView,
//   Appointments
// } from "@devexpress/dx-react-scheduler-material-ui";
// import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import { blue } from "@material-ui/core/colors";
// import { appointments } from "./data";


// const theme = createMuiTheme({ palette: { type: "light", primary: blue } });

// class App extends React.PureComponent {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: appointments
//     };
//   }
//   render() {
//     const { data } = this.state;

//     return (
//       <div>
//         <Header />
//         <MuiThemeProvider theme={theme}>
//             <Paper>
//             <Scheduler data={data}>
//                 {/* <ViewState currentDate="2018-06-28" /> */}
//                 <ViewState currentDate="2019-12-17" />
//                 <WeekView startDayHour={9} endDayHour={17} />
//                 <Appointments />
//             </Scheduler>
//             </Paper>
//         </MuiThemeProvider>
//         <Footer />
//         </div>
//     );
//   }
// }
// export default App;

// render(<App />, document.getElementById("root"));
import * as React from 'react';
import './App.css';
import Header from './components/header/Header';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  WeekView,
  EditRecurrenceMenu,
  AllDayPanel,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import Footer from './components/footer/Footer';
// import CurrentMonth from './components/header/CurrentMonth';

const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

export default class SchedulePlanner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // currentDate: '2018-06-27',
      currentDate: date,

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointmentId: undefined,
    };
    
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  componentDidMount() {
    fetch('http://localhost:3001/appointment')
      .then(res => res.json())
      .then(data => this.setState({ data }))
  }

  onCommitChanges = (addedAppointment) => {
    console.log(addedAppointment)
    
    this.setState({ addedAppointment })
  }

  changeAddedAppointment = (addedAppointment) => {
    this.setState({ addedAppointment });
  }

  changeAppointmentChanges = (appointmentChanges) => {
    this.setState({ appointmentChanges });
  }

  changeEditingAppointmentId = (editingAppointmentId) => {
    this.setState({ editingAppointmentId });
  }

  commitChanges = ({ added, changed, deleted }) => {
    console.log(this.state.data)
    if (added) {
      fetch('http://localhost:3001/appointment', {
        method: 'POST',
        body: JSON.stringify(added),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(res => this.setState(prevState => ({
        data: [
          ...prevState.data,
          res
        ]
      })))
    }
    
    // this.setState((state) => {
    //   let { data } = state;
    //   if (changed) {
    //     data = data.map(appointment => (
    //       changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    //   }
    //   if (deleted !== undefined) {
    //     data = data.filter(appointment => appointment.id !== deleted);
    //   }
    //   return { data };
    // });
  }

  render() {
    const {
      currentDate, data, addedAppointment, appointmentChanges, editingAppointmentId,
    } = this.state;

    return (
      <>
      <Header />
      {/* <CurrentMonth /> */}
        <Paper>
          <Scheduler
            data={data}
            height={660}
            firstDayOfWeek={1}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <Toolbar />
            <DateNavigator />
            <EditingState
              onCommitChanges={this.commitChanges}

              addedAppointment={addedAppointment}
              onAddedAppointmentChange={this.changeAddedAppointment}

              appointmentChanges={appointmentChanges}
              onAppointmentChangesChange={this.changeAppointmentChanges}

              editingAppointmentId={editingAppointmentId}
              onEditingAppointmentIdChange={this.changeEditingAppointmentId}
            />
            <WeekView
              startDayHour={9}
              endDayHour={17}
            />
            <AllDayPanel />
            <EditRecurrenceMenu />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip
              showOpenButton
              showDeleteButton
              showCloseButton
            />
            <AppointmentForm />
          </Scheduler>
        </Paper>
      <Footer />
      </>
    );
  }
}
