import React from 'react';
import Calendar from './calendar.jsx';
import styled from 'styled-components';
import { props } from 'bluebird';

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
  
`;

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false
    };
  }

  changeState() {

  }

  render() {
    return (
      <DateContainer>
        <DateLabel>
          Date
        </DateLabel>
        <div>
          <Calendar updateSelectedDate={this.props.updateSelectedDate}/>
        </div>
      </DateContainer>
    );
  }
}

export default DateDropdown;
