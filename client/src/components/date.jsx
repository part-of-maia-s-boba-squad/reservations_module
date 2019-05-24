import React from 'react';
import moment from 'moment';
import Calendar from './calendar.jsx';
import styled from 'styled-components';

const DateContainer = styled.div`
  display: relative;
`;

const DateLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding-bottom: .25rem;
  margin: 0;
  padding: 0;
`;

const SelectedDateDiv = styled.div`
  font-size: .875rem;
  height: 34px;
  line-height: 2.2rem;
  -webkit-appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
  display: flex;
  position: relative;
  &:hover{border-bottom: 2px solid #da3743;};
`;

const DownArrow = styled.svg`
  position: absolute;
  top: 0;
  right: 6px;
  height: 100%;
  width: .5rem;
  fill: #6f737b;
`;

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false
    };
  }

  toggleCalendar(e) {
    e.preventDefault();
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }

  render() {
    var calendar;
    if (this.state.showCalendar) {
      calendar = <Calendar 
        updateSelectedDate={this.props.updateSelectedDate} 
        toggleCalendar={this.toggleCalendar.bind(this)}
      />
    }

    return (
      <DateContainer>
        <DateLabel>
          Date
        </DateLabel>
        <div>
          <SelectedDateDiv onClick={(e) => this.toggleCalendar(e)}>
            {moment(this.props.selectedDate).format('ddd, M/D')}
            <DownArrow className="f6180ebd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}} /></DownArrow>
          </SelectedDateDiv>
          {calendar}
        </div>
      </DateContainer>
    );
  }
}

export default DateDropdown;
