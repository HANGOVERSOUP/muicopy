import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import YearButton from './YearButton';
import {cloneDate} from './dateUtils';

class CalendarYear extends Component {
  static propTypes = {
    displayDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onTouchTapYear: PropTypes.func,
    range: PropTypes.bool,
    selectedDate: PropTypes.object.isRequired,
    wordings: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate() {
    this.scrollToSelectedYear();
  }

  getYears() {
    const minYear = this.props.minDate.getFullYear();
    const maxYear = this.props.maxDate.getFullYear();

    const years = [];
    const selectedDate = this.props.range ? this.props.selectedDate.end : this.props.selectedDate;
    const dateCheck = cloneDate(selectedDate);
    for (let year = minYear; year <= maxYear; year++) {
      dateCheck.setFullYear(year);
      const selected = selectedDate.getFullYear() === year;
      let selectedProps = {};
      if (selected) {
        selectedProps = {ref: 'selectedYearButton'};
      }

      const yearButton = (
        <YearButton
          key={`yb${year}`}
          onTouchTap={this.handleTouchTapYear}
          selected={selected}
          year={year}
          {...selectedProps}
        />
      );

      years.push(yearButton);
    }

    return years;
  }

  scrollToSelectedYear() {
    if (this.selectedYearButton === undefined) return;

    const container = ReactDOM.findDOMNode(this);
    const yearButtonNode = ReactDOM.findDOMNode(this.selectedYearButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  }

  handleTouchTapYear = (event, year) => {
    if (this.props.onTouchTapYear) this.props.onTouchTapYear(event, year);
  };

  render() {
    const years = this.getYears();
    const backgroundColor = this.context.muiTheme.datePicker.calendarYearBackgroundColor;
    const {prepareStyles} = this.context.muiTheme;
    const styles = {
      root: {
        backgroundColor: backgroundColor,
        height: 'inherit',
        lineHeight: '35px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        position: 'relative',
      },
      child: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.child)}>
          {years}
        </div>
      </div>
    );
  }
}

export default CalendarYear;
