import React from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';

import DateDropdown from './date.jsx';
import PartySize from './partySize.jsx';
import TimeDropdown from './time.jsx';

const Container = styled.div`
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
  width: 288px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 16px;
  @media(max-width:1055px) {
    width: 608px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 0;
  grid-column: 1/3;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  @media(max-width:1055px) {
    grid-column: 1/4;
  }
  `;

const TitleSpan = styled.span`
  font-size: 21px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  font-family: inherit;
`;

const TitleH3 = styled.h3`
  font-size: 21px;
  height 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #d8d9db;
`;

const ButtonRow = styled.div`
  grid-column: 1/3;
  display: flex;
  margin: 1rem auto 0;
  overflow: hidden;
  width: 100%;
  padding: 0;
  justify-content: center;
  align-items: center;
  @media(max-width:1055px) {
    grid-column: 1/4;
  }
`;

const AvailableButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  @media(max-width:1055px) {
    justify-content: center;
  }
`;

const IconSvg = styled.svg`
  width: 24px;
  height: 24px;
`;

const BookedTimesRow = styled.div`
  grid-column: 1/3;
  text-align: left;
  margin: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  line-height: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  @media(max-width:1055px) {
    grid-column: 1/4;
    justify-content: center;
  }
`;

const FindATableButton = styled.div`
  font-family: BlinkMacSystemFont;
  font-weight: 500;
  padding: .75rem 1rem;
  text-decoration: none;
  background-color: #da3743;
  color: #fff;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  width: 80%;
  text-align: center;
  @media(max-width:1055px) {
    width: 256px;
  }
`;

const TimeSlotButtons = styled.button`
  min-width: 72px;
  height: 32px;
  font-size: .875rem;
  background-color: #da3743;
  cursor: pointer;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .25rem;
  margin: .25rem;
  display: inline-block;
  border-radius: 3px;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  &:focus {outline:0;};
  &:hover{background-color: #f5a5ab;};
`;

const NoReservationsDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-family: inherit;
  font-size: .875rem;
  background-color: #f1f2f4;
  padding: 1rem;
`;

const ExclamationMark = styled.div`
  height: 100%;
  padding: 5px;
`;

const SelectATimeText = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  @media(max-width:1055px) {
    text-align: center;
  }
  `;

class Reservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restID: this.props.path.split('/')[2] || '001',
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
    console.log(this.state.restID)
    axios.get(`/API/restaurant/reservation/${this.state.restID}/bookedTimes`)
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
    let partySize = this.state.selectedPartySize;
    let date = this.state.selectedDate;
    let time = this.state.selectedTime;
    let dateTime = moment(date + ' ' + time).format("YYYY-MM-DD HH:mm:ss");
    axios.get(`/API/restaurant/reservation/${this.state.restID}/reservations/?partySize=${partySize}&dateTime=${dateTime}`)
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
    var searchResults;
    if (this.state.screenChange === 1) {
      searchResults = <FindATableButton id="selectButton" onClick={this.getAvailableReservations.bind(this)} key="button">Find a Table</FindATableButton>;
    } else if (this.state.availableReservations.length > 0) {
      var buttons = [];
      buttons.push(<SelectATimeText>Select a time:</SelectATimeText>);
      for (let i = 0; i < this.state.availableReservations.length; i++) {
        buttons.push(<TimeSlotButtons key={`${i}`}><span>{this.state.availableReservations[i].format("LT")}</span></TimeSlotButtons>);
      }
      searchResults = <AvailableButtons>{buttons}</AvailableButtons>;
    } else {
      searchResults = (
      <NoReservationsDiv>
        <ExclamationMark>
          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><title>icon/ic_information</title><desc>Created with Sketch.</desc><defs><circle id="path-11" cx={10} cy={10} r={10} /><rect id="path-2" x={0} y={3} width={2} height={5} rx="0.5" /><rect id="path-3" x={0} y={0} width={2} height={2} rx="0.5" /></defs><g id="Symbols" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><g id="icon/ic_information"><g id="ic_information"><rect id="boundry" x={0} y={0} width={24} height={24} /><g id="Group-41" transform="translate(2.000000, 2.000000)"><g id="Oval"><use fill="#333333" fillRule="evenodd" xlinkHref="#path-11" /><circle stroke="#333333" strokeWidth={2} cx={10} cy={10} r={9} /></g><g id="Group-4" transform="translate(10.000000, 10.000000) scale(1, -1) translate(-10.000000, -10.000000) translate(9.000000, 6.000000)"><g id="Rectangle-3"><use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-2" /><rect stroke="#FFFFFF" strokeWidth={1} x="0.5" y="3.5" width={1} height={4} rx="0.5" /></g><g id="Rectangle-3"><use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-3" /><rect stroke="#FFFFFF" strokeWidth={1} x="0.5" y="0.5" width={1} height={1} rx="0.5" /></g></g></g></g></g></g></svg>
        </ExclamationMark>  
        <span>At the moment, there’s no online availability within 2.5 hours of {this.state.selectedTime}. Have another time in mind?</span>
      </NoReservationsDiv>)
    }

    return (
      <Container>
        <TitleContainer>
          <TitleH3>
            <TitleSpan id="title">
              Make a reservation
            </TitleSpan>
          </TitleH3>
        </TitleContainer>
        <PartySize updatePartySize={this.updatePartySize.bind(this)} selectedPartySize={this.state.selectedPartySize}/>
        <DateDropdown updateSelectedDate={this.updateSelectedDate.bind(this)} selectedDate={this.state.selectedDate}/>
        <TimeDropdown updateSelectedTime={this.updateSelectedTime.bind(this)} selectedTime={this.state.selectedTime}/>
        <ButtonRow>
          {searchResults}
        </ButtonRow>
        <BookedTimesRow>
          <IconSvg>
            <path d="M15.5,5 C15.2239,5 15,5.223846 15,5.5 L15,6.5 C15,6.77615 15.2239,7 15.5,7 L17.5858,7 L14,10.58578 L12.70711,9.29291 L12.35355,8.93933 C12.15829,8.74408 11.84171,8.74408 11.64645,8.93933 L11.29289,9.29291 L5,15.5858 L5,7 L11.5,7 C11.77614,7 12,6.77615 12,6.5 L12,5.5 C12,5.22385 11.77614,5 11.5,5 L5,5 C3.89543,5 3,5.89542 3,7 L3,17 C3,18.1046 3.89543,19 5,19 L19,19 C20.1046,19 21,18.1046 21,17 L21,14.5 C21,14.2238 20.7761,14 20.5,14 L19.5,14 C19.2239,14 19,14.2238 19,14.5 L19,17 L6.4142,17 L12,11.41422 L13.2929,12.70709 L13.6464,13.06067 C13.8417,13.25592 14.1583,13.25592 14.3536,13.06067 L14.7071,12.70709 L19,8.41422 L19,10.5 C19,10.77615 19.2239,11 19.5,11 L20.5,11 C20.7761,11 21,10.77615 21,10.5 L21,6 L21,5.5 C21,5.223846 20.7761,5 20.5,5 L20,5 L15.5,5 Z" id="bookedIcon" fill="#333333" fillRule="nonzero" mask="url(#mask-2)"></path>
          </IconSvg>
          {`Booked ${this.state.bookedTimes} times today`}
        </BookedTimesRow>
      </Container>
    );
  }
}

export default Reservations;
