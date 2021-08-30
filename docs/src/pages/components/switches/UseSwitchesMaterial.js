/* eslint-disable no-restricted-imports, react/prop-types */
import * as React from 'react';
import clsx from 'clsx';
import {
  unstable_composeClasses as composeClasses,
  useSwitch,
} from '@material-ui/unstyled';
import { alpha, darken, lighten, useThemeProps, styled } from '@material-ui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { capitalize } from '@mui/material/utils';
import {
  useFormControl,
  switchClasses,
  getSwitchUtilityClass,
} from '@mui/material';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';
import useTouchRipple from '@mui/material/useTouchRipple';

const useUtilityClasses = (ownerState) => {
  const { classes, edge, size, color, checked, disabled, focusVisible } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      edge && `edge${capitalize(edge)}`,
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
    ],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      focusVisible && 'focusVisible',
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: 14 / 2,
  zIndex: -1,
  transition: theme.transitions.create(['opacity', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.common.black
      : theme.palette.common.white,
  opacity: theme.palette.mode === 'light' ? 0.38 : 0.3,
}));

const SwitchBase = styled('span', {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return {
      ...styles.switchBase,
      ...styles.input,
      ...(ownerState.color !== 'default' &&
        styles[`color${capitalize(ownerState.color)}`]),
    };
  },
})(
  ({ theme, ownerState }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    color:
      theme.palette.mode === 'light'
        ? theme.palette.common.white
        : theme.palette.grey[300],
    transition: theme.transitions.create(['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: 9,
    borderRadius: '50%',
    ...(ownerState.edge === 'start' && {
      marginLeft: ownerState.size === 'small' ? -3 : -12,
    }),
    ...(ownerState.edge === 'end' && {
      marginRight: ownerState.size === 'small' ? -3 : -12,
    }),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
      pointerEvents: 'none',
      cursor: 'default',
    },
    [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
      opacity: 0.5,
    },
    [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
      opacity: theme.palette.mode === 'light' ? 0.12 : 0.2,
    },
  }),
  ({ theme, ownerState }) => ({
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity,
      ),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    ...(ownerState.color !== 'default' && {
      [`&.${switchClasses.checked}`]: {
        color: theme.palette[ownerState.color].main,
        '&:hover': {
          backgroundColor: alpha(
            theme.palette[ownerState.color].main,
            theme.palette.action.hoverOpacity,
          ),
          '@media (hover: none)': {
            backgroundColor: 'transparent',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          color:
            theme.palette.mode === 'light'
              ? lighten(theme.palette[ownerState.color].main, 0.62)
              : darken(theme.palette[ownerState.color].main, 0.55),
        },
      },
      [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
        backgroundColor: theme.palette[ownerState.color].main,
      },
    }),
  }),
);

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return {
      ...styles.root,
      ...(ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`]),
      ...styles[`size${capitalize(ownerState.size)}`],
      ...styles.input,
      ...(ownerState.color !== 'default' &&
        styles[`color${capitalize(ownerState.color)}`]),
    };
  },
})(({ ownerState }) => ({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0,
  verticalAlign: 'middle',
  '@media print': {
    colorAdjust: 'exact',
  },
  ...(ownerState.edge === 'start' && {
    marginLeft: -8,
  }),
  ...(ownerState.edge === 'end' && {
    marginRight: -8,
  }),
  ...(ownerState.size === 'small' && {
    width: 40,
    height: 24,
    padding: 7,
    [`& .${switchClasses.thumb}`]: {
      width: 16,
      height: 16,
    },
    [`& .${switchClasses.switchBase}`]: {
      padding: 4,
      [`&.${switchClasses.checked}`]: {
        transform: 'translateX(16px)',
      },
    },
  }),
}));

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
  overridesResolver: (props, styles) => styles.thumb,
})(({ theme }) => ({
  boxShadow: theme.shadows[1],
  backgroundColor: 'currentColor',
  width: 20,
  height: 20,
  borderRadius: '50%',
}));

const SwitchInput = styled('input', {
  name: 'MuiSwitch',
  slot: 'Input',
  skipSx: true,
})({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '300%',
  height: '100%',
  top: 0,
  left: '-100%',
  margin: 0,
  padding: 0,
  zIndex: 1,
});

const renderThumb = (isChecked, icon, checkedIcon, defaultThumbClassName) => {
  if (!isChecked && icon) {
    return icon;
  }

  if (isChecked && checkedIcon) {
    return checkedIcon;
  }

  return <SwitchThumb className={defaultThumbClassName} />;
};

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSwitch' });

  const {
    checked: checkedProp,
    checkedIcon,
    className,
    color = 'primary',
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    disableRipple = false,
    disableTouchRipple = false,
    edge = false,
    icon,
    inputProps,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    size = 'medium',
    TouchRippleProps,
    ...other
  } = props;

  const rippleRef = React.useRef(null);

  const muiFormControl = useFormControl();

  const handleFocus = (event) => {
    onFocus?.(event);

    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };

  const handleBlur = (event) => {
    onBlur?.(event);

    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };

  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const {
    getInputProps,
    checked,
    disabled: disabledState,
    focusVisible,
  } = useSwitch({
    ...props,
    disabled,
  });

  const ownerState = {
    ...props,
    checked,
    disabled: disabledState,
    focusVisible,
    color,
    edge,
    size,
  };

  const { enableTouchRipple, getRippleHandlers } = useTouchRipple({
    rippleRef,
    focusVisible,
    disabled: disabledState,
    disableRipple,
    disableTouchRipple,
    disableFocusRipple,
  });

  const rippleHandlers = getRippleHandlers({
    onBlur: handleBlur,
  });

  const classes = useUtilityClasses(ownerState);

  return (
    <SwitchRoot
      {...other}
      className={clsx(className, classes.root)}
      ref={ref}
      ownerState={ownerState}
    >
      <SwitchBase
        className={classes.switchBase}
        ownerState={ownerState}
        {...rippleHandlers}
        onFocus={handleFocus}
      >
        <SwitchInput
          ownerState={ownerState}
          {...getInputProps({ className: classes.input, ...inputProps })}
        />
        {renderThumb(checked, icon, checkedIcon, classes.thumb)}
        {enableTouchRipple && (
          <TouchRipple ref={rippleRef} center {...TouchRippleProps} />
        )}
      </SwitchBase>
      <SwitchTrack className={classes.track} />
    </SwitchRoot>
  );
});

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function UseSwitchesMaterial() {
  return (
    <div>
      <ThemeProvider theme={createTheme()}>
        <Switch {...label} defaultChecked />
        <Switch {...label} color="secondary" />
        <Switch {...label} disabled defaultChecked />
        <Switch {...label} disabled />
      </ThemeProvider>
    </div>
  );
}
