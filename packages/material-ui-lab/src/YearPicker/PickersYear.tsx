import * as React from 'react';
import clsx from 'clsx';
import { useForkRef, capitalize } from '@material-ui/core/utils';
import {
  alpha,
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
} from '@material-ui/core/styles';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import {
  WrapperVariant,
  WrapperVariantContext,
} from '../internal/pickers/wrappers/WrapperVariantContext';
import pickersYearClasses, { getPickersYearUtilityClass } from './pickersYearClasses';

export interface YearProps {
  className?: string;
  classes?: Partial<Record<PickersYearClassKey, string>>;
  autoFocus?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  forwardedRef?: React.Ref<HTMLButtonElement>;
  onClick: (event: React.MouseEvent, value: number) => void;
  onKeyDown: (event: React.KeyboardEvent, value: number) => void;
  selected: boolean;
  value: number;
}

export type PickersYearClassKey = keyof typeof pickersYearClasses;

type StyleProps = YearProps & { wrapperVariant: WrapperVariant };

const useUtilityClasses = (styleProps: StyleProps) => {
  const { wrapperVariant, disabled, selected, classes } = styleProps;

  const slots = {
    root: ['root', wrapperVariant && `mode${capitalize(wrapperVariant)}`],
    yearButton: ['yearButton', disabled && 'disabled', selected && 'selected'],
  };

  return composeClasses(slots, getPickersYearUtilityClass, classes);
};

const PickersYearRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiPickersYear',
    slot: 'Root',
    overridesResolver: (
      props: { styleProps: StyleProps },
      styles: Partial<Record<PickersYearClassKey, object>>,
    ) => {
      const { styleProps } = props;
      return {
        ...styles.root,
        ...(styleProps.wrapperVariant &&
          styles[`mode${capitalize(styleProps.wrapperVariant)}` as PickersYearClassKey]),
      };
    },
  },
)(({ styleProps }) => ({
  flexBasis: '33.3%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...(styleProps.wrapperVariant === 'desktop' && {
    flexBasis: '25%',
  }),
}));

const PickersYearButton = experimentalStyled(
  'button' as const,
  {},
  {
    name: 'MuiPickersYear',
    slot: 'YearButton',
    overridesResolver: () => ({}),
  },
)(({ theme }) => ({
  color: 'unset',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  ...(theme.typography.subtitle1 as React.CSSProperties),
  margin: '8px 0',
  height: 36,
  width: 72,
  borderRadius: 16,
  cursor: 'pointer',
  '&:focus, &:hover': {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
  },
  [`&.${pickersYearClasses.disabled}`]: {
    color: theme.palette.text.secondary,
  },
  [`&.${pickersYearClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:focus, &:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

/**
 * @ignore - internal component.
 */
const PickersYear = React.forwardRef<HTMLButtonElement, YearProps>((inProps, forwardedRef) => {
  // eslint-disable-next-line material-ui/mui-name-matches-component-name
  const props = useThemeProps({ props: inProps, name: 'MuiPickersYear' });
  const { autoFocus, className, children, disabled, onClick, onKeyDown, selected, value } = props;
  const ref = React.useRef<HTMLButtonElement>(null);
  const refHandle = useForkRef(ref, forwardedRef as React.Ref<HTMLButtonElement>);
  const wrapperVariant = React.useContext(WrapperVariantContext);

  const styleProps = {
    ...props,
    wrapperVariant,
  };

  const classes = useUtilityClasses(styleProps);

  // TODO: Can we just forward this to the button?
  React.useEffect(() => {
    if (autoFocus) {
      // `ref.current` being `null` would be a bug in Material-UIu
      ref.current!.focus();
    }
  }, [autoFocus]);

  return (
    <PickersYearRoot
      data-mui-test="year"
      className={clsx(classes.root, className)}
      styleProps={styleProps}
    >
      <PickersYearButton
        ref={refHandle}
        disabled={disabled}
        type="button"
        data-mui-test={`year-${children}`}
        tabIndex={selected ? 0 : -1}
        onClick={(event) => onClick(event, value)}
        onKeyDown={(event) => onKeyDown(event, value)}
        className={classes.yearButton}
        styleProps={styleProps}
      >
        {children}
      </PickersYearButton>
    </PickersYearRoot>
  );
});

export default PickersYear;
