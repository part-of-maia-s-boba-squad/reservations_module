import React from 'react';
import Calendar from './calendar.jsx';
import styled from 'styled-components';
import { props } from 'bluebird';

const DateLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding-bottom: .25rem;
  margin: 0;
  padding: 0;
`;

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  changeState() {

  }

  render() {
    return (
      <div>
        <DateLabel>
          Date
        </DateLabel>
        <div>
          <Calendar updateSelectedDate={this.props.updateSelectedDate}/>
        </div>
      </div>
    );
  }
}

export default DateDropdown;
