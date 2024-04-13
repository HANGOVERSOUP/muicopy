'use client';
// @inheritedComponent Tooltip
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Fab from '../Fab';
import Tooltip from '../Tooltip';
import { getSpeedDialActionUtilityClass } from './speedDialActionClasses';

const useUtilityClasses = (ownerState) => {
  const { open, classes } = ownerState;

  const slots = {
    fab: ['fab', !open && 'fabClosed'],
  };

  return composeClasses(slots, getSpeedDialActionUtilityClass, classes);
};

const SpeedDialActionFab = styled(Fab, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.fab, !ownerState.open && styles.fabClosed];
  },
})(({ theme, ownerState }) => ({
  margin: 8,
  color: (theme.vars || theme).palette.text.secondary,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: theme.vars
      ? theme.vars.palette.SpeedDialAction.fabHoverBg
      : emphasize(theme.palette.background.paper, 0.15),
  },
  opacity: 1,
  ...(!ownerState.open && {
    opacity: 0,
  }),
}));

const SpeedDialAction = React.forwardRef(function SpeedDialAction(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSpeedDialAction' });
  const {
    className,
    delay = 0,
    FabProps = {},
    icon,
    id,
    open,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle,
    ...other
  } = props;

  const ownerState = { ...props, tooltipPlacement };
  const classes = useUtilityClasses(ownerState);

  const [tooltipOpen, setTooltipOpen] = React.useState(tooltipOpenProp);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionStyle = { transitionDelay: `${delay}ms` };

  const fab = (
    <SpeedDialActionFab
      size="small"
      className={clsx(classes.fab, className)}
      tabIndex={-1}
      role="menuitem"
      ownerState={ownerState}
      {...FabProps}
      style={{
        ...transitionStyle,
        ...FabProps.style,
      }}
    >
      {icon}
    </SpeedDialActionFab>
  );

  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }

  return (
    <Tooltip
      id={id}
      ref={ref}
      title={tooltipTitle}
      placement={tooltipPlacement}
      onClose={handleTooltipClose}
      onOpen={handleTooltipOpen}
      open={open && (tooltipOpen || tooltipOpenProp)}
      classes={TooltipClasses}
      {...other}
    >
      {fab}
    </Tooltip>
  );
});

SpeedDialAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: PropTypes.number,
  /**
   * Props applied to the [`Fab`](/material-ui/api/fab/) component.
   * @default {}
   */
  FabProps: PropTypes.object,
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: PropTypes.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * `classes` prop applied to the [`Tooltip`](/material-ui/api/tooltip/) element.
   */
  TooltipClasses: PropTypes.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   */
  tooltipOpen: PropTypes.bool,
  /**
   * Placement of the tooltip.
   * @default 'left'
   */
  tooltipPlacement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: PropTypes.node,
};

export default SpeedDialAction;
