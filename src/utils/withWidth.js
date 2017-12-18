import * as React from 'react';
import * as PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import * as hoistNonReactStatics from 'hoist-non-react-statics';
import wrapDisplayName from 'recompose/wrapDisplayName';
import withTheme from '../styles/withTheme';
import { keys as breakpointKeys } from '../styles/createBreakpoints';
import debounce from './debounce';

// By default, returns true if screen width is the same or greater than the given breakpoint.
export const isWidthUp = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }
  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
export const isWidthDown = (breakpoint, width, inclusive = false) => {
  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }
  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

const withWidth = (options = {}) => Component => {
  const {
    resizeInterval = 166, // Corresponds to 10 frames at 60 Hz.
  } = options;

  class Width extends React.Component {
    state = {
      width: undefined,
    };

    componentDidMount() {
      this.updateWidth(window.innerWidth);
    }

    componentWillUnmount() {
      this.handleResize.cancel();
    }

    handleResize = debounce(() => {
      this.updateWidth(window.innerWidth);
    }, resizeInterval);

    updateWidth(innerWidth) {
      if (this.props.theme) {
        const breakpoints = this.props.theme.breakpoints;
        let width = null;

        /**
         * Start with the slowest value as low end devices often have a small screen.
         *
         * innerWidth |xs      sm      md      lg      xl
         *            |-------|-------|-------|-------|------>
         * width      |  xs   |  sm   |  md   |  lg   |  xl
         */
        let index = 1;
        while (width === null && index < breakpointKeys.length) {
          const currentWidth = breakpointKeys[index];

          // @media are inclusive, so reproduce the behavior here.
          if (innerWidth < breakpoints.values[currentWidth]) {
            width = breakpointKeys[index - 1];
            break;
          }

          index += 1;
        }

        width = width || 'xl';

        if (width !== this.state.width) {
          this.setState({
            width,
          });
        }
      }
    }

    render() {
      const { initialWidth, theme, width, ...other } = this.props;
      const props = {
        width: width || this.state.width || initialWidth,
        ...other,
      };

      // When rendering the component on the server,
      // we have no idea about the client browser screen width.
      // In order to prevent blinks and help the reconciliation of the React tree
      // we are not rendering the child component.
      //
      // An alternative is to use the `initialWidth` property.
      if (props.width === undefined) {
        return null;
      }

      return (
        <EventListener target="window" onResize={this.handleResize}>
          <Component {...props} />
        </EventListener>
      );
    }
  }

  Width.propTypes = {
    /**
     * As `window.innerWidth` is unavailable on the server,
     * we default to rendering an empty componenent during the first mount.
     * In some situation you might want to use an heristic to approximate
     * the screen width of the client browser screen width.
     *
     * For instance, you could be using the user-agent or the client-hints.
     * http://caniuse.com/#search=client%20hint
     */
    initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    /**
     * @ignore,
     */
    theme: PropTypes.object.isRequired,
    /**
     * Bypass the width calculation logic.
     */
    width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  if (process.env.NODE_ENV !== 'production') {
    Width.displayName = wrapDisplayName(Component, 'withWidth');
  }

  hoistNonReactStatics(Width, Component);

  return withTheme()(Width);
};

export default withWidth;
