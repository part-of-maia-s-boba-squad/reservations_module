import React from 'react';
import moment from 'moment';
// import styled from 'styled-components';

const CalendarContainer = styled.div`
    position: absolute;
    font-family: BrandonText,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    border: 1px solid #d8d9db;
    background-color: #f1f2f4;
    padding: 16px 0px;
    width: 256px;
`;

const MonthYearTitleDiv = styled.div`
    position: relative;
    height: 34px;
    text-align: center;
    font-weight: 700;
    line-height: 2em;
`;
    
const MonthYearTitleSpan = styled.span`
    display: inline-block;
`;

const ArrowsSpanLeft = styled.span`
    position: absolute;
    left: 10px;
    top: 0px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 1px solid #d8d9db;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{border: 2px solid #da3743;}
`;

const ArrowsSvgLeft = styled.svg`
    transform: rotate(180deg);
    width: 6px;
    height: 9px;
`;

const ArrowsSpanRight = styled.span`
    position: absolute;
    left: 210px;
    top: 0px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 1px solid #d8d9db;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{border: 2px solid #da3743;}
`;

const ArrowsSvgRight = styled.svg`
    width: 6px;
    height: 9px;
`;

const CalendarTableDiv = styled.div`
    display: flex;
    justify-content: center;
`;

const CalendarTable = styled.table`
    border-collapse: collapse;
`;

const DayOfWeek = styled.th`
    padding: .5rem 0;
    font-size: .875rem;
    text-align: center;
    color: #2d333f;
    font-weight: normal;
`;

const EachDay = styled.td`
    display: table-cell;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    border: 1px solid #d8d9db;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    font-weight: 500;
    background-clip: padding-box;
    width: 32px;
    height: 34px;
    &:hover{border: 2px solid #da3743;}
`;

const CalDayEmpty = styled.td`
    display: table-cell;
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
    border: 1px solid #d8d9db;
    box-sizing: border-box;
    position: relative;
    font-weight: 500;
    background-clip: padding-box;
    width: 32px;
    height: 34px;
    &:hover{border: 2px solid #da3743;}
`;

class Calendar extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            showYearTable: false,
            showMonthTable: false,
            showDateTable: true,
            dateObject: moment(),
            allmonths: moment.months(),
        }
    }

    firstDayOfMonth() {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf('month').format('d');
        return firstDay;
    }

    currentDay() {
        return this.state.dateObject.format("D");
    }

    month() {
        return this.state.dateObject.format("MMMM");
    }

    MonthList(props) {
        let months = [];
        //props.data is an array of all months
        props.data.map(data => {
            months.push(
                <td
                    key={data}
                    className = "calendar-month"
                    onClick={e => {props.setMonth(data)}}
                >
                    <span>{data}</span>
                </td>
            );
        });

        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            //push into rows with 3 columns each row
            if (i % 3 !== 0 || i==0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        //push last row into rows
        rows.push(cells);
        //add to table row
        let monthlist = rows.map((d, i) => {
            return <tr>{d}</tr>;
        });

        
        return (
            <table className="calendar-month">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Month</th>
                    </tr>
                </thead>
                <tbody>{monthlist}</tbody>
            </table>
        )
    }

    setMonth(month) {
        let monthNo = this.state.allmonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject). set("month", monthNo);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showDateTable: !this.state.showDateTable
        });
    }

    showMonth(e, month) {
        this.setState({
            showMonthTable: !this.state.showMonthTable
        });
    }

    year() {
        return this.state.dateObject.format("Y");
    }

    YearTable(props) {
        let months = [];
        let nextten = moment().set("year", props).add("year", 12).format("Y");
        let twelveyears = props.getDates(props, nextten);
        twelveyears.map(data => {
            months.push(
                <td
                    key={data}
                    className="calendar-month"
                    onClick={e => props.setYear(data)}
                >
                    <span>{data}</span>
                </td>
            );
        });
        let rows = [];
        let cells = [];
        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
        let yearlist = rows.map((d, i) => {
            return <tr>{d}</tr>
        });

        return (
            <table className="calendar-month">
                <thead>
                    <tr>
                        <th colSpan="4">Select a Year</th>
                    </tr>
                </thead>
                <tbody>{yearlist}</tbody>
            </table>
        )
    }

    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate < stopDate) {
            dateArray.push(moment(currentDate).format("YYYY"));
            currentDate = moment(currentDate).add(1, "year");
        }
        return dateArray;
    }

    setYear(year) {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("year", year);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showYearTable: !this.state.showYearTable
        });
    }

    showYearTable(e) {
        this.setState({
            showYearTable: !this.state.showYearTable,
            showDateTable: !this.state.showDateTable
        });
    }

    onPrev() {
        let curr = "";
        if (this.state.showYearTable == true) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
    }

    onNext() {
        let curr = "";
        if (this.state.showYearTable == true) {
            curr = "year";
        } else {
            curr = "month";
        }
        this.setState({
            dateObject: this.state.dateObject.add(1, curr)
        });
    }

    onDayClick(e, d) {
        e.preventDefault();
        this.props.updateSelectedDate(`${this.month()} ${d}, ${this.year()}`);
        this.props.toggleCalendar(e);
    }

    render() {
        var weekdayshort = moment.weekdaysShort();
        let weekdayshortname = weekdayshort.map(day => {
            return (
                <DayOfWeek key={day} className="week-day">{day}</DayOfWeek>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <CalDayEmpty className="calendar-day empty">{""}</CalDayEmpty>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++) {
            let currentDay = d == this.currentDay() ? "today" : "";
            daysInMonth.push(
                <EachDay key={d} className={`calendar-day ${currentDay}`}>
                <span onClick={e => this.onDayClick(e, d)}>{d}</span>
                </EachDay>
            );
        }

        let blanksEnd = [];
        if ((blanks.length+daysInMonth.length)%7 !== 0) {
            for (let i = 0; i < 7 - (blanks.length+daysInMonth.length)%7; i++) {
                blanksEnd.push(
                    <CalDayEmpty className="calendar-day empty">{""}</CalDayEmpty>
                );
            }
        }

        var totalSlots = [...blanks, ...daysInMonth,...blanksEnd];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i%7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>
        });

        return (
            <CalendarContainer>
                <div className="tail-datetime-calendar">
                    <MonthYearTitleDiv 
                        className="calendar-navi"
                    >
                        {/* <span onClick={e => this.onPrev()} className="calendar-button button-prev" >{"<"} */}
                            <ArrowsSpanLeft onClick={e => this.onPrev()} className="calendar-button button-prev">
                                <ArrowsSvgLeft>
                                    <path d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'></path>
                                </ArrowsSvgLeft>
                            </ArrowsSpanLeft>
                        {/* </span> */}
                        {/* <MonthYearTitleSpan className="calendar-label" 
                            //onClick={e => this.showMonth()}
                        >
                            {this.month()} 
                        </MonthYearTitleSpan>
                        <MonthYearTitleSpan className="calendar-label" 
                            //onClick={e => this.showYearTable()}
                            >
                            {this.year()}
                        </MonthYearTitleSpan> */}
                        <MonthYearTitleSpan>{`${this.month()} ${this.year()}`}</MonthYearTitleSpan>
                        {/* <span onClick={e => this.onNext()} className="calendar-button button-next" >{">"}</span> */}
                            <ArrowsSpanRight onClick={e => this.onNext()} className="calendar-button button-next">
                                <ArrowsSvgRight>
                                    <path d='M5.09 3.68L4.39 3 1.56.15a.5.5 0 0 0-.71 0l-.7.7a.5.5 0 0 0 0 .71L2.62 4 .15 6.51a.5.5 0 0 0 0 .71l.71.71a.5.5 0 0 0 .71 0L4.39 5.1l.71-.71a.5.5 0 0 0-.01-.71z'></path>
                                </ArrowsSvgRight>
                            </ArrowsSpanRight>
                    </MonthYearTitleDiv>
                </div>
                    <div className="calendar-date">
                        {this.state.showYearTable && (
                        <this.YearTable props={this.year()} getDates={this.getDates.bind(this)} setYear={this.setYear.bind(this)} />)}
                        {this.state.showMonthTable && 
                        <this.MonthList data={moment.months()} setMonth={this.setMonth.bind(this)} /> }
                    </div>
                {this.state.showDateTable && (
                <CalendarTableDiv>
                    <CalendarTable>
                        <thead>
                            <tr>
                                {weekdayshortname}
                            </tr>
                        </thead>
                        <tbody>
                            {daysinmonth}
                        </tbody>
                    </CalendarTable>
                </CalendarTableDiv>)}
            </CalendarContainer>
        )
    }
}

export default Calendar;