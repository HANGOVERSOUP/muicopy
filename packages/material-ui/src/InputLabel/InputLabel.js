import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import FormLabel, { formLabelClasses } from '../FormLabel';
import useThemeProps from '../styles/useThemeProps';
import styled, { rootShouldForwardProp } from '../styles/styled';
import { getInputLabelUtilityClasses } from './inputLabelClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, formControl, size, shrink, disableAnimation, variant } = styleProps;
  const slots = {
    root: [
      'root',
      formControl && 'formControl',
      !disableAnimation && 'animated',
      shrink && 'shrink',
      size === 'small' && 'sizeSmall',
      variant,
    ],
  };

  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the FormLabel
    ...composedClasses,
  };
};

const InputLabelRoot = styled(FormLabel, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiInputLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    return {
      [`& .${formLabelClasses.asterisk}`]: styles.asterisk,
      ...styles.root,
      ...(!styleProps.formControl && styles.formControl),
      ...(styleProps.size === 'small' && styles.sizeSmall),
      ...(styleProps.shrink && styles.shrink),
      ...(!styleProps.disableAnimation && styles.animated),
      ...styles[styleProps.variant],
    };
  },
})(({ theme, styleProps }) => {
  const { startAdornmentWidth } = styleProps.formControl || {};
  let translateX =
    (styleProps.variant === 'filled' || !styleProps.shrink) && startAdornmentWidth
      ? startAdornmentWidth + 8
      : 0;
  if (styleProps.variant === 'filled') {
    translateX += 12;
  }
  if (styleProps.variant === 'outlined') {
    translateX += 14;
  }
  return {
    display: 'block',
    transformOrigin: 'top left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    ...(styleProps.formControl && {
      position: 'absolute',
      left: 0,
      top: 0,
      // slight alteration to spec spacing to match visual spec result
      transform: `translate(${translateX}px, 20px) scale(1)`,
    }),
    ...(styleProps.size === 'small' && {
      // Compensation for the `Input.inputSizeSmall` style.
      transform: `translate(${translateX}px, 17px) scale(1)`,
    }),
    ...(styleProps.shrink && {
      transform: `translate(${translateX}px, -1.5px) scale(0.75)`,
      transformOrigin: 'top left',
      maxWidth: '133%',
    }),
    ...(!styleProps.disableAnimation && {
      transition: theme.transitions.create(['color', 'transform', 'max-width'], {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    }),
    ...(styleProps.variant === 'filled' && {
      // Chrome's autofill feature gives the input field a yellow background.
      // Since the input field is behind the label in the HTML tree,
      // the input field is drawn last and hides the label with an opaque background color.
      // zIndex: 1 will raise the label above opaque background-colors of input.
      zIndex: 1,
      pointerEvents: 'none',
      transform: `translate(${translateX}px, 16px) scale(1)`,
      maxWidth: 'calc(100% - 24px)',
      ...(styleProps.size === 'small' && {
        transform: `translate(${translateX}px, 13px) scale(1)`,
      }),
      ...(styleProps.shrink && {
        transform: `translate(${translateX}px, 7px) scale(0.75)`,
        maxWidth: 'calc(133% - 24px)',
        ...(styleProps.size === 'small' && {
          transform: `translate(${translateX}px, 4px) scale(0.75)`,
        }),
      }),
    }),
    ...(styleProps.variant === 'outlined' && {
      // see comment above on filled.zIndex
      zIndex: 1,
      pointerEvents: 'none',
      transform: `translate(${translateX}px, 16px) scale(1)`,
      maxWidth: 'calc(100% - 24px)',
      ...(styleProps.size === 'small' && {
        transform: `translate(${translateX}px, 9px) scale(1)`,
      }),
      ...(styleProps.shrink && {
        maxWidth: 'calc(133% - 24px)',
        transform: `translate(${translateX}px, -9px) scale(0.75)`,
      }),
    }),
  };
});

const InputLabel = React.forwardRef(function InputLabel(inProps, ref) {
  const props = useThemeProps({ name: 'MuiInputLabel', props: inProps });
  const { disableAnimation = false, margin, shrink: shrinkProp, variant, ...other } = props;

  const muiFormControl = useFormControl();

  let shrink = shrinkProp;
  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink =
      muiFormControl.filled ||
      muiFormControl.focused ||
      (muiFormControl.adornedStart && !muiFormControl.startAdornmentWidth);
  }

  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['size', 'variant'],
  });

  const styleProps = {
    ...props,
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
  };

  const classes = useUtilityClasses(styleProps);
  return (
    <InputLabelRoot
      data-shrink={shrink}
      styleProps={styleProps}
      ref={ref}
      {...other}
      classes={classes}
    />
  );
});

InputLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * If `true`, the transition animation is disabled.
   * @default false
   */
  disableAnimation: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the `input` of this label is focused.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * if `true`, the label will indicate that the `input` is required.
   */
  required: PropTypes.bool,
  /**
   * If `true`, the label is shrunk.
   */
  shrink: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default InputLabel;
