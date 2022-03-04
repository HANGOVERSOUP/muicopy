import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import FormLabel from '../FormLabel';
import FormHelperText from '../FormHelperText';
import Input from '../Input';
import { styled, useThemeProps } from '../styles';
import { TextFieldProps, TextFieldTypeMap } from './TextFieldProps';
import textFieldClasses, { getTextFieldUtilityClass } from './textFieldClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTextFieldUtilityClass, {});
};

const TextFieldRoot = styled('div', {
  name: 'MuiTextField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TextFieldProps }>(({ theme, ownerState }) => ({
  '--FormLabel-margin': '0 0 0.25rem 0',
  '--FormHelperText-margin': '0.25rem 0 0 0',
  '--FormLabel-asterisk-color': theme.vars.palette.danger[500],
  '--FormHelperText-color': theme.vars.palette[ownerState.color!]?.[500],
  ...(ownerState.size === 'sm' && {
    '--FormHelperText-fontSize': theme.vars.fontSize.xs,
    '--FormLabel-fontSize': theme.vars.fontSize.xs,
  }),
  [`&.${textFieldClasses.error}`]: {
    '--FormHelperText-color': theme.vars.palette.danger[500],
  },
  [`&.${textFieldClasses.disabled}`]: {
    '--FormLabel-color': theme.vars.palette[ownerState.color || 'neutral']?.textDisabledColor,
    '--FormHelperText-color': theme.vars.palette[ownerState.color || 'neutral']?.textDisabledColor,
  },
  display: 'flex',
  flexDirection: 'column',
}));

const TextField = React.forwardRef(function TextField(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiTextField',
  });

  const {
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    label,
    helperText,
    id: idOverride,
    autoComplete,
    autoFocus,
    placeholder,
    defaultValue,
    value,
    name,
    onBlur,
    onChange,
    onFocus,
    inputRef,
    color,
    disabled = false,
    error = false,
    required = false,
    size = 'md',
    variant = 'outlined',
    startAdornment,
    endAdornment,
    ...other
  } = props;

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const formLabelId = label && id ? `${id}-label` : undefined;

  const ownerState = {
    label,
    helperText,
    startAdornment,
    endAdornment,
    disabled,
    error,
    required,
    size,
    variant,
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <TextFieldRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {label && (
        <FormLabel
          htmlFor={id}
          id={formLabelId}
          {...componentsProps.label}
          {...(components.Label && {
            component: components.Label,
          })}
        >
          {label}
        </FormLabel>
      )}

      <Input
        id={id}
        inputRef={inputRef}
        aria-describedby={helperTextId}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        color={color}
        size={size}
        variant={variant}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        components={{
          Root: components.InputRoot,
          Input: components.InputInput,
        }}
        componentsProps={{
          root: componentsProps.root,
          input: componentsProps.inputInput,
        }}
      />
      {helperText && (
        <FormHelperText
          id={helperTextId}
          {...componentsProps.helperText}
          {...(components.HelperText && {
            component: components.HelperText,
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </TextFieldRoot>
  );
}) as OverridableComponent<TextFieldTypeMap>;

TextField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  components: PropTypes.shape({
    HelperText: PropTypes.elementType,
    InputInput: PropTypes.elementType,
    InputRoot: PropTypes.elementType,
    Label: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    helperText: PropTypes.object,
    inputInput: PropTypes.object,
    inputRoot: PropTypes.object,
    label: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endAdornment: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: PropTypes.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
} as any;

export default TextField;
