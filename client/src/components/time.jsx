import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const TimeContainer = styled.div`
  display: flex;
  position: relative;
`;

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
  background-color: Transparent;
  &:focus {outline:0;};
  &:hover{border-bottom: 2px solid #da3743;};
`;

const DownArrow = styled.svg`
  position: absolute;
  top: 0;
  right: 5px;
  height: 100%;
  width: .5rem;
  fill: #6f737b;
  z-index: -1;
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
        <TimeContainer>
          <TimeSlotSelectMenu value={this.props.selectedTime} onChange={(e) => this.props.updateSelectedTime(e)}>
            {timeArr}
          </TimeSlotSelectMenu>
          <DownArrow className="f6180ebd" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.07 5.24"><path d="M4.39 5.09l.71-.71 2.82-2.82a.5.5 0 0 0 0-.71l-.7-.7a.5.5 0 0 0-.71 0L4 2.62 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L3 4.39l.71.71a.5.5 0 0 0 .68-.01z" style={{fill: 'rgb(51, 51, 51)'}} /></DownArrow>
        </TimeContainer>
      </div>
    );
  }
}


export default TimeDropdown;
