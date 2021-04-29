import * as React from 'react';
import clsx from 'clsx';
import {
  experimentalStyled,
  unstable_useThemeProps as useThemeProps,
  Theme,
} from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@material-ui/unstyled';
import { CLOCK_WIDTH, CLOCK_HOUR_WIDTH } from './shared';

type SpanProps = JSX.IntrinsicElements['span'];
export interface ClockNumberProps extends SpanProps {
  classes?: Partial<typeof clockNumberClasses>;
  disabled: boolean;
  index: number;
  inner: boolean;
  label: string;
  selected: boolean;
  // TODO: spread to a `span`. What are the implications (generic role etc.)
  'aria-label': string;
  sx: SxProps<Theme>;
}

export type ClockNumberClassKey = keyof typeof clockNumberClasses;

export function getClockNumberUtilityClass(slot: string) {
  return generateUtilityClass('MuiClockNumber', slot);
}

export const clockNumberClasses = generateUtilityClasses('MuiClockNumber', [
  'root',
  'selected',
  'disabled',
  'inner',
]);

const useUtilityClasses = (styleProps: ClockNumberProps) => {
  const { inner, classes } = styleProps;

  const slots = {
    root: ['root', inner && 'inner'],
  };

  return composeClasses(slots, getClockNumberUtilityClass, classes);
};

const ClockNumberRoot = experimentalStyled(
  'span',
  {},
  {
    name: 'MuiClockNumber',
    slot: 'Root',
    overridesResolver: (props, styles: Record<ClockNumberClassKey, object>) => {
      const { styleProps } = props;
      return {
        ...styles.root,
        ...(styleProps.inner && styles.inner),
      };
    },
  },
)(({ theme, styleProps = {} }) => ({
  width: CLOCK_HOUR_WIDTH,
  height: CLOCK_HOUR_WIDTH,
  position: 'absolute',
  left: `calc((100% - ${CLOCK_HOUR_WIDTH}px) / 2)`,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: theme.palette.text.primary,
  '&:focused': {
    backgroundColor: theme.palette.background.paper,
  },
  [`&.${clockNumberClasses.selected}`]: {
    color: theme.palette.primary.contrastText,
  },
  [`&.${clockNumberClasses.disabled}`]: {
    pointerEvents: 'none',
    color: theme.palette.text.disabled,
  },
  ...(!!styleProps.inner && {
    ...(theme.typography.body2 as React.CSSProperties),
    color: theme.palette.text.secondary,
  }),
}));

/**
 * @ignore - internal component.
 */
function ClockNumber(inProps: ClockNumberProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiClockNumber' });
  const { className, disabled, index, inner, label, selected, theme, ...other } = props;
  const styleProps = { ...props };

  const classes = useUtilityClasses(styleProps);

  const angle = ((index % 12) / 12) * Math.PI * 2 - Math.PI / 2;
  const length = ((CLOCK_WIDTH - CLOCK_HOUR_WIDTH - 2) / 2) * (inner ? 0.65 : 1);
  const x = Math.round(Math.cos(angle) * length);
  const y = Math.round(Math.sin(angle) * length);

  const transformStyle = {
    transform: `translate(${x}px, ${y + (CLOCK_WIDTH - CLOCK_HOUR_WIDTH) / 2}px`,
  };

  return (
    <ClockNumberRoot
      className={clsx(classes.root, className)}
      style={transformStyle}
      styleProps={styleProps}
      theme={theme as Theme}
      {...other}
    >
      {label}
    </ClockNumberRoot>
  );
}

export default ClockNumber;
