import React from 'react';
import axios from 'axios';
import moment from 'moment';
import DateDropdown from './date.jsx';
import PartySize from './partySize.jsx';
import TimeDropdown from './time.jsx';



class Reservations extends React.Component {
  constructor() {
    super();
    this.state = {
      bookedTimes: "",
      selectedDate: moment().format("LL"),
      selectedTime: "12:30 PM", 
      selectedPartySize: 12,
      screenChange: 1,
      availableReservations: []
    };
  }
  
  componentDidMount() {
    this.getBookedTimesRequest();
  }

  getBookedTimesRequest() {
    var restID = Math.floor(Math.random()*100+1).toString().padStart(3, '0');
    axios.get(`/restaurants/${restID}/bookedTimes`)
      .then((result) => {
        this.setState({
          bookedTimes: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getAvailableReservations() {
    let restID = '001';
    let partySize = this.state.selectedPartySize;
    let date = this.state.selectedDate;
    let time = this.state.selectedTime;
    let dateTime = moment(date + ' ' + time).format("YYYY-MM-DD HH:mm:ss");

    axios.get(`/restaurants/${restID}/reservations/?partySize=${partySize}&dateTime=${dateTime}`)
      .then((result) => {
        var reservationArr = [];
        for (let i = 0; i < result.data.length; i++) {
          reservationArr.push(moment(result.data[i].timeSlot));
        }
        this.setState({
          availableReservations: reservationArr,
          screenChange: this.state.screenChange + 1
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updateSelectedDate(date) {
    this.setState({
      selectedDate: date,
      screenChange: 1
    });
  }

  updateSelectedTime(e) {
    e.preventDefault();
    this.setState({
      selectedTime: e.target.value,
      screenChange: 1
    });
  }

  updatePartySize(e) {
    e.preventDefault();
    this.setState({
      selectedPartySize: e.target.value,
      screenChange: 1
    });
  }

  render() {
    var selectButton = [];
    if (this.state.screenChange === 1) {
      selectButton.push(<button id="findATableButton" onClick={this.getAvailableReservations.bind(this)} key="button">Find a Table</button>);
    } else {
      for (let i = 0; i < this.state.availableReservations.length; i++) {
        selectButton.push(<div id="timeChoices" key={`${i}`}><span>{this.state.availableReservations[i].format("LT")}</span></div>)
      }
    }

    return (
      <div className="container">
        <div id="reservationTitle">
          <h3>
            <span>
              Make a reservation
            </span>
          </h3>
        </div>
        <div id="userInput">
          <div>
            <PartySize updatePartySize={this.updatePartySize.bind(this)} selectedPartySize={this.state.selectedPartySize}/>
            <div className="row">
              <div className="column">
                <DateDropdown updateSelectedDate={this.updateSelectedDate.bind(this)}/>
              </div>
              <div className="column">
                <TimeDropdown updateSelectedTime={this.updateSelectedTime.bind(this)} selectedTime={this.state.selectedTime}/>
              </div>
            </div>
          </div>
          <div id="buttonRow">
            {selectButton}
          </div>
          <div id="bookedTimes">
            <svg>
            <path d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z" id="bookedIcon" fill="#333333" fillRule="nonzero" mask="url(#mask-2)"></path>
            </svg>
            {`Booked ${this.state.bookedTimes} times today`}
          </div>
        </div>
      </div>
    );
  }
}

export default Reservations;
