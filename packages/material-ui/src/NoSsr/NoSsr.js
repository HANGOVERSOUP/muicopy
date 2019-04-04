import React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';

const baseEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? React.useLayoutEffect
    : React.useEffect;

/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */
function NoSsr(props) {
  const { children, defer, fallback } = props;
  const [mountedState, setMountedState] = React.useState(false);

  baseEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <React.Fragment>{mountedState ? children : fallback}</React.Fragment>;
}

NoSsr.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node.isRequired,
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   */
  defer: PropTypes.bool,
  /**
   * The fallback content to display.
   */
  fallback: PropTypes.node,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  NoSsr['propTypes' + ''] = exactProp(NoSsr.propTypes);
}

NoSsr.defaultProps = {
  defer: false,
  fallback: null,
};

export default NoSsr;
