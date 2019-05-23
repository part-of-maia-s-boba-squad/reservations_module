import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const TimeLabel = styled.div`
  font-size: .875rem;
  font-weight: 500;
  padding-bottom: .25rem;
  margin: 0;
  padding: 0;
`;

const TimeSlotSelectMenu = styled.select`
  cursor: pointer;
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  display: block;
  outline: none;
  border: none;
  width: 100%;
  height: 35px;
  -webkit-appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
  text-transform: none;
  &:focus {outline:0;}
`;

class TimeDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var time = moment("2019-05-30T00:00");
    var timeArr = [];
    for(let i = 0; i < 48; i++) {
      timeArr.push(<option value={`${time.format('LT')}`} key={`${i}`}>{time.format('LT')}</option>)
      time.add('30', 'm');
    }
    return (
      <div id="time">
        <TimeLabel>
              Time
        </TimeLabel>
        <div>
          <TimeSlotSelectMenu value={this.props.selectedTime} onChange={(e) => this.props.updateSelectedTime(e)}>
            {timeArr}
          </TimeSlotSelectMenu>
        </div>
      </div>
    );
  }
}


export default TimeDropdown;
