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
          </SelectedDateDiv>
          {calendar}
        </div>
      </DateContainer>
    );
  }
}

export default DateDropdown;
