import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import ClickAwayListener from '../ClickAwayListener';
import {
  SnackbarUnstyledOwnerState,
  SnackbarUnstyledProps,
  SnackbarUnstyledRootSlotProps,
  SnackbarUnstyledTypeMap,
} from './SnackbarUnstyled.types';
import composeClasses from '../composeClasses';
import { getSnackbarUnstyledUtilityClass } from './snackbarUnstyledClasses';
import useSnackbar from './useSnackbar';
import { useSlotProps, WithOptionalOwnerState } from '../utils';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSnackbarUnstyledUtilityClass, undefined);
};
/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarUnstyled API](https://mui.com/base/api/snackbar-unstyled/)
 */
const SnackbarUnstyled = React.forwardRef(function SnackbarUnstyled(
  props: SnackbarUnstyledProps & { component?: React.ElementType },
  ref: React.ForwardedRef<any>,
) {
  const {
    autoHideDuration = null,
    children,
    ClickAwayListenerProps,
    component,
    components = {},
    componentsProps = {},
    disableWindowBlurListener = false,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    ...other
  } = props;

  const classes = useUtilityClasses();

  const { getRootProps, getTransitionProps, exited, onClickAway } = useSnackbar({
    autoHideDuration,
    disableWindowBlurListener,
    onClose,
    open,
    resumeHideDuration,
    ref,
  });

  const ownerState: SnackbarUnstyledOwnerState = {
    ...props,
    autoHideDuration,
    disableWindowBlurListener,
    exited,
  };

  const Root = component || components.Root || 'div';

  const TransitionComponent = components.Transition;

  const componentsPropsRootSlotEventCallback = (
    eventHandler: keyof React.HTMLAttributes<HTMLDivElement>,
  ) => {
    if (typeof componentsProps.root === 'object') {
      return componentsProps.root?.[eventHandler];
    }

    if (typeof componentsProps.root === 'function') {
      return componentsProps.root?.(ownerState)?.[eventHandler];
    }
    return null;
  };

  const rootProps: WithOptionalOwnerState<SnackbarUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: (eventHandlers) =>
      getRootProps({
        ...eventHandlers,
        onBlur: componentsPropsRootSlotEventCallback('onBlur') || onBlur,
        onFocus: componentsPropsRootSlotEventCallback('onFocus') || onFocus,
        onMouseEnter: componentsPropsRootSlotEventCallback('onMouseEnter') || onMouseEnter,
        onMouseLeave: componentsPropsRootSlotEventCallback('onMouseLeave') || onMouseLeave,
      }),
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  // So that we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={onClickAway} {...ClickAwayListenerProps}>
      <Root {...rootProps}>
        {TransitionComponent ? (
          <TransitionComponent
            {...componentsProps.transition}
            {...getTransitionProps({
              onEnter:
                typeof componentsProps.transition === 'function'
                  ? componentsProps.transition?.(ownerState)?.onEnter
                  : componentsProps.transition?.onEnter,
              onExited:
                typeof componentsProps.transition === 'function'
                  ? componentsProps.transition?.(ownerState)?.onExited
                  : componentsProps.transition?.onExited,
            })}
          >
            {children}
          </TransitionComponent>
        ) : (
          children
        )}
      </Root>
    </ClickAwayListener>
  );
}) as OverridableComponent<SnackbarUnstyledTypeMap>;

SnackbarUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
    Transition: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
} as any;

export default SnackbarUnstyled;
