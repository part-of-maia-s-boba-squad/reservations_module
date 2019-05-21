import React from 'react';
import moment from 'moment';

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
        <div id="timeTitle">
              Time
        </div>
        <div>
          <select id="timeMenu" value={this.props.selectedTime} onChange={(e) => this.props.updateSelectedTime(e)}>
            {timeArr}
          </select>
        </div>
      </div>
    );
  }
}


export default TimeDropdown;
