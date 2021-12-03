import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled } from '../styles';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import { SwitchProps } from './SwitchProps';

const useUtilityClasses = (ownerState: SwitchProps & { focusVisible: boolean }) => {
  const { classes, checked, disabled, focusVisible, readOnly } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readOnly',
    ],
    thumb: ['thumb', checked && 'checked'],
    track: ['track', checked && 'checked'],
    input: ['input'],
  };

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const SwitchRoot = styled('span', {
  name: 'JoySwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: SwitchProps }>(({ theme, ownerState }) => {
  return {
    '--joy-Switch-track-radius': theme.vars.borderRadius[ownerState.roundness!],
    '--joy-Switch-track-width': '48px',
    '--joy-Switch-track-height': '24px',
    '--joy-Switch-thumb-size': '16px',
    ...(ownerState.size === 'small' && {
      '--joy-Switch-track-width': '40px',
      '--joy-Switch-track-height': '20px',
      '--joy-Switch-thumb-size': '12px',
    }),
    ...(ownerState.size === 'large' && {
      '--joy-Switch-track-width': '64px',
      '--joy-Switch-track-height': '32px',
      '--joy-Switch-thumb-size': '24px',
    }),
    '--joy-Switch-thumb-radius': 'calc(var(--joy-Switch-track-radius) - 2px)',
    '--joy-Switch-thumb-width': 'var(--joy-Switch-thumb-size)',
    '--joy-Switch-thumb-offset':
      'max((var(--joy-Switch-track-height) - var(--joy-Switch-thumb-size)) / 2, 0px)',
    display: 'inline-block',
    width: 'var(--joy-Switch-track-width)', // should have the same width as track because flex parent can stretch SwitchRoot.
    borderRadius: 'var(--joy-Switch-track-radius)',
    position: 'relative',
    padding:
      'calc((var(--joy-Switch-thumb-size) / 2) - (var(--joy-Switch-track-height) / 2)) calc(-1 * var(--joy-Switch-thumb-offset))',
    ...(ownerState.elevation && {
      boxShadow: theme.vars.elevation[ownerState.elevation],
    }),
    color: theme.vars.palette.neutral.containedBg,
    '&:hover': {
      color: theme.vars.palette.neutral.containedBg,
    },
    [`&.${switchClasses.checked}`]: {
      color: theme.vars.palette[ownerState.color!].containedBg,
      '&:hover': {
        color: theme.vars.palette[ownerState.color!].containedHoverBg,
      },
    },
    [`&.${switchClasses.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.6,
    },
    [`&.${switchClasses.focusVisible}`]: theme.focus.default,
  };
});

const SwitchInput = styled('input', {
  name: 'JoySwitch',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: SwitchProps }>(() => ({
  margin: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  cursor: 'pointer',
}));

const SwitchTrack = styled('span', {
  name: 'JoySwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})<{ ownerState: SwitchProps & { focusVisible: boolean } }>(() => ({
  position: 'relative',
  color: 'inherit',
  height: 'var(--joy-Switch-track-height)',
  width: 'var(--joy-Switch-track-width)',
  display: 'block',
  backgroundColor: 'currentColor',
  borderRadius: 'var(--joy-Switch-track-radius)',
}));

const SwitchThumb = styled('span', {
  name: 'JoySwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})<{ ownerState: SwitchProps }>(() => ({
  transition: 'left 0.2s',
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - var(--joy-Switch-track-width) / 2 + var(--joy-Switch-thumb-width) / 2 + var(--joy-Switch-thumb-offset))',
  transform: 'translate(-50%, -50%)',
  width: 'var(--joy-Switch-thumb-width)',
  height: 'var(--joy-Switch-thumb-size)',
  borderRadius: 'var(--joy-Switch-thumb-radius)',
  backgroundColor: '#fff',
  [`&.${switchClasses.checked}`]: {
    left: 'calc(50% + var(--joy-Switch-track-width) / 2 - var(--joy-Switch-thumb-width) / 2 - var(--joy-Switch-thumb-offset))',
  },
}));

const Switch = React.forwardRef<HTMLSpanElement, SwitchProps>(function Switch(inProps, ref) {
  const props = inProps;
  const {
    checked: checkedProp,
    className,
    component,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
    required,
    color = 'primary',
    elevation,
    roundness = 'default',
    size,
    ...otherProps
  } = props;

  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp,
  };

  const { getInputProps, checked, disabled, focusVisible, readOnly } = useSwitch(useSwitchProps);

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    readOnly,
    color,
    elevation,
    roundness,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchRoot
      ref={ref}
      {...otherProps}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <SwitchTrack ownerState={ownerState} className={clsx(classes.track)} />
      <SwitchThumb ownerState={ownerState} className={clsx(classes.thumb)} />
      <SwitchInput ownerState={ownerState} {...getInputProps()} className={clsx(classes.input)} />
    </SwitchRoot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes.elementType,
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
} as any;

export default Switch;
