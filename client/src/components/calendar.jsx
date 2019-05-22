import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

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
        console.log(props)
        let months = [];
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
            if (i % 3 !== 0 || i==0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);
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
        }else {
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
        this.props.updateSelectedDate(`${this.month()} ${d}, ${this.year()}`);
        // this.setState({
        //     selectedDay: d,
        //     selectedMonth: this.month(),
        //     selectedYear: this.year()
        // }, () => {
        //     console.log(this.month(), this.state.selectedDay, this.year());
        //     console.log(props)
        // });
    }

    render() {
        var weekdayshort = moment.weekdaysShort();
        let weekdayshortname = weekdayshort.map(day => {
            return (
                <th key={day} className="week-day">{day}</th>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );
        }

        let daysInMonth = [];
        for (let d = 1; d <= this.state.dateObject.daysInMonth(); d++) {
            let currentDay = d ==this.currentDay() ? "today" : "";
            daysInMonth.push(
                <td key={d} className={`calendar-day ${currentDay}`}>
                <span onClick={e => this.onDayClick(e, d)}>{d}</span>
                </td>
            );
        }

        var totalSlots = [...blanks, ...daysInMonth];
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
            <div>
                <div className="tail-datetime-calendar">
                    <div 
                        className="calendar-navi"
                    >
                        <span onClick={e => this.onPrev()} className="calendar-button button-prev" >{"<"}</span>
                        <span className="calendar-label" onClick={e => this.showMonth()}>
                            {this.month()}
                        </span>
                        <span className="calendar-label" onClick={e => this.showYearTable()}>
                            {this.year()}
                        </span>
                        <span onClick={e => this.onNext()} className="calendar-button button-next" >{">"}</span>
                    </div>
                </div>
                    <div className="calendar-date">
                        {this.state.showYearTable && (
                        <this.YearTable props={this.year()} getDates={this.getDates.bind(this)} setYear={this.setYear.bind(this)} />)}
                        {this.state.showMonthTable && 
                        <this.MonthList data={moment.months()} setMonth={this.setMonth.bind(this)} /> }
                    </div>
                {this.state.showDateTable && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                {weekdayshortname}
                            </tr>
                        </thead>
                        <tbody>
                            {daysinmonth}
                        </tbody>
                    </table>
                </div>)}
            </div>
        )
    }
}

export default Calendar;