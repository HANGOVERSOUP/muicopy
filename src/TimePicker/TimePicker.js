// @flow weak

import React, { Component, PropTypes } from 'react';
// import { createStyleSheet } from 'jss-theme-reactor';
// import classNames from 'classnames';
import TextField, { TextFieldInput, TextFieldLabel } from '../TextField';
import TimePickerDialog from './TimePickerDialog';
import { formatTime } from '../utils/timeUtils';


const emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);
emptyTime.setSeconds(0);
emptyTime.setMilliseconds(0);

/* export const styleSheet = createStyleSheet('TimePicker', (theme) => {
  return {}
});*/

class TimePicker extends Component {
  static propTypes = {
    /**
     * If true, automatically accept and close the picker on set minutes.
     */
    autoOk: PropTypes.bool,
    /**
     * Override the label of the 'Cancel' button.
     */
    cancelLabel: PropTypes.node,
    /**
     * The initial time value of the TimePicker.
     */
    defaultTime: PropTypes.object,
    /**
     * Override the inline-styles of TimePickerDialog's root element.
     */
    dialogStyle: PropTypes.object,
    /**
     * If true, the TimePicker is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Tells the component to display the picker in `ampm` (12hr) format or `24hr` format.
     */
    format: PropTypes.oneOf(['ampm', '24hr']),
    /**
     * text that should be shown as a label
     */
    hintText: PropTypes.string,
    /**
     * if true, the TimePicker as the landscape view
     */
    landscape: PropTypes.bool,
    /**
     * Override the label of the 'OK' button.
     */
    okLabel: PropTypes.node,
    /**
     * Callback function that is fired when the time value changes. The time value is passed in a Date Object.
     * Since there is no particular event associated with the change the first argument will always be null
     * and the second argument will be the new Date instance.
     */
    onChange: PropTypes.func,
    /**
     * Callback function fired when the TimePicker `TextField` gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function fired when the TimePicker is tapped or clicked.
     */
    onTouchTap: PropTypes.func,
    /**
     * If true, uses ("noon" / "midnight") instead of ("12 a.m." / "12 p.m.").
     *
     * It's technically more correct to refer to "12 noon" and "12 midnight"
     * rather than "12 a.m." and "12 p.m."
     * and it avoids confusion between different locales.
     * By default (for compatibility reasons) TimePicker uses
     * ("12 a.m." / "12 p.m.").
     */
    pedantic: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Override the inline-styles of TimePicker's TextField element.
     */
    textFieldStyle: PropTypes.object,
    /**
     * Sets the time for the Time Picker programmatically.
     */
    value: PropTypes.object,
  };

  static defaultProps = {
    autoOk: false,
    cancelLabel: 'Cancel',
    defaultTime: null,
    disabled: false,
    format: 'ampm',
    landscape: false,
    okLabel: 'OK',
    pedantic: false,
    style: {},
    value: null,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static muiName = 'TimePicker';

  state = {
    time: null,
    dialogTime: new Date(),
  };

  componentWillMount() {
    this.setState({
      time: this.isControlled() ? this.getControlledTime() : this.props.defaultTime,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        time: this.getControlledTime(nextProps),
      });
    }
  }

  /**
   * Alias for `openDialog()` for an api consistent with TextField.
   */
  focus() {
    this.openDialog();
  }

  openDialog() {
    this.setState({
      dialogTime: this.state.time,
    });
    this.dialogWindow.show();
  }

  handleAcceptDialog = (time) => {
    this.setState({
      time,
    });
    if (this.props.onChange) this.props.onChange(null, time);
  };

  handleFocusInput = (event) => {
    event.target.blur();
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleOnClick = (event) => {
    event.preventDefault();

    if (!this.props.disabled) {
      this.openDialog();
    }
  };

  isControlled() {
    return this.props.value !== null;
  }

  getControlledTime(props) {
    if (!props) {
      props = this.props;
    }
    let result = null;
    if (props.value instanceof Date) {
      result = props.value;
    }
    return result;
  }

  props = undefined;
  input = undefined;
  dialogWindow = undefined;

  render() {
    const {
      autoOk,
      cancelLabel,
      defaultTime, // eslint-disable-line no-unused-vars
      dialogStyle,
      format,
      landscape,
      okLabel,
      onFocus, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      pedantic,
      style,  // eslint-disable-line no-unused-vars
      textFieldStyle,
      hintText,
      ...other
    } = this.props;

    const { time } = this.state;
    // const classes = this.context.styleManager.render(styleSheet);

    return (
      <div>
        <TextField>
          <TextFieldLabel htmlFor="date">
            {hintText}
          </TextFieldLabel>
          <TextFieldInput
            {...other}
            style={textFieldStyle}
            ref={(input) => { this.input = input; }}
            value={time === emptyTime ? null : formatTime(time, format, pedantic)}
            onFocus={this.handleFocusInput}
            onClick={this.handleOnClick}
          />
        </TextField>
        <TimePickerDialog
          ref={(dialogWindow) => { this.dialogWindow = dialogWindow; }}
          initialTime={this.state.dialogTime}
          onAccept={this.handleAcceptDialog}
          format={format}
          landscape={landscape}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          autoOk={autoOk}
          style={dialogStyle}
        />
      </div>
    );
  }
}

export default TimePicker;
