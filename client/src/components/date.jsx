import React from 'react';
import Calendar from './calendar.jsx';
import { props } from 'bluebird';

class DateDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  changeState() {

  }

  render() {
    return (
      <div>
        <div id="dateTitle">
          Date
        </div>
        <div>
          <Calendar updateSelectedDate={this.props.updateSelectedDate}/>
        </div>
      </div>
    );
  }
}

export default DateDropdown;
