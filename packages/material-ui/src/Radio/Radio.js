import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwitchBase from '../internal/SwitchBase';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import { capitalize, createChainedFunction } from '../utils/helpers';
import withStyles from '../styles/withStyles';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary,
  },
  /* Styles applied to the root element if `checked={true}`. */
  checked: {},
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main,
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main,
    },
    '&$disabled': {
      color: theme.palette.action.disabled,
    },
  },
});

export const RadioGroupContext = React.createContext(null);

const Radio = React.forwardRef(function Radio(props, ref) {
  const {
    checked: checkedProp,
    classes,
    color,
    name: nameProp,
    onChange: onChangeProp,
    ...other
  } = props;
  const radioGroup = React.useContext(RadioGroupContext);

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <SwitchBase
      type="radio"
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon />}
      classes={{
        root: clsx(classes.root, classes[`color${capitalize(color)}`]),
        checked: classes.checked,
        disabled: classes.disabled,
      }}
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      {...other}
    />
  );
});

Radio.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  /**
   * If `true`, the switch will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Attributes applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Use that property to pass a ref callback to the native input component.
   */
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {boolean} checked The `checked` value of the switch
   */
  onChange: PropTypes.func,
  /**
   * The input component property `type`.
   */
  type: PropTypes.string,
  /**
   * The value of the component.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
};

Radio.defaultProps = {
  color: 'secondary',
};

export default withStyles(styles, { name: 'MuiRadio' })(Radio);
