import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { FormLabelProps, FormLabelTypeMap } from './FormLabelProps';
import { getFormLabelUtilityClass } from './formLabelClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
    asterisk: ['asterisk'],
    separator: ['separator'],
  };

  return composeClasses(slots, getFormLabelUtilityClass, {});
};

const FormLabelRoot = styled('label', {
  name: 'MuiFormLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: FormLabelProps }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: `var(--FormLabel-fontSize, ${theme.vars.fontSize.sm})`,
  fontWeight: theme.vars.fontWeight.md,
  lineHeight: theme.vars.lineHeight.md,
  color: `var(--FormLabel-color, ${theme.vars.palette.text.primary})`,
  margin: 'var(--FormLabel-margin, initial)',
}));

const AsteriskComponent = styled('span', {
  name: 'MuiFormLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk,
})<{ ownerState: FormLabelProps }>({
  color: 'var(--FormLabel-asterisk-color)',
});

const Separator = styled('span', {
  name: 'MuiFormLabel',
  slot: 'separator',
  overridesResolver: (props, styles) => styles.separator,
})<{ ownerState: FormLabelProps }>({
  width: '0.25rem',
  maxHeight: 0,
  visibility: 'hidden',
});

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiFormLabel',
  });

  const { children, className, component, endDecorator, required = false, ...other } = props;

  const ownerState = {
    ...props,
  };

  const classes = useUtilityClasses();

  return (
    <FormLabelRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {required && (
        <AsteriskComponent ownerState={ownerState} aria-hidden className={classes.asterisk}>
          &thinsp;{'*'}
        </AsteriskComponent>
      )}

      {endDecorator && <Separator ownerState={ownerState} className={classes.separator} />}
      {endDecorator}
    </FormLabelRoot>
  );
}) as OverridableComponent<FormLabelTypeMap>;

FormLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The content at the end of the label (or asterisk if required).
   */
  endDecorator: PropTypes.node,
} as any;

export default FormLabel;
