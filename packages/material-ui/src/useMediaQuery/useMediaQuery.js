import React from 'react';
import warning from 'warning';
import { getThemeProps, useTheme } from '@material-ui/styles';

// This variable will be true once the server-side hydration is completed.
let hydrationCompleted = false;

function useMediaQuery(queryInput, options = {}) {
  const theme = useTheme();
  const props = getThemeProps({
    theme,
    name: 'MuiUseMediaQuery',
    props: {},
  });

  warning(
    typeof queryInput !== 'function' || theme !== null,
    [
      'Material-UI: the `query` argument provided is invalid.',
      'You are providing a function without a theme in the context.',
      'One of the parent elements needs to use a ThemeProvider.',
    ].join('\n'),
  );

  let query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
  query = query.replace(/^@media( ?)/m, '');

  // Wait for jsdom to support the match media feature.
  // All the browsers Material-UI support have this built-in.
  // This defensive check is here for simplicity.
  // Most of the time, the match media logic isn't central to people tests.
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const { defaultMatches = false, noSsr = false, ssrMatchMedia = null } = {
    ...props,
    ...options,
  };

  const [match, setMatch] = React.useState(() => {
    if ((hydrationCompleted || noSsr) && supportMatchMedia) {
      return window.matchMedia(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  React.useEffect(() => {
    let ignore = false;
    hydrationCompleted = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = window.matchMedia(query);
    const updateMatch = () => {
      if (!ignore) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      ignore = true;
      queryList.removeListener(updateMatch);
    };
  }, [query, supportMatchMedia]);

  return match;
}

export function testReset() {
  hydrationCompleted = false;
}

export default useMediaQuery;
