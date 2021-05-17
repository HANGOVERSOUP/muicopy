import * as React from 'react';
import GlobalStyles from '@material-ui/core/GlobalStyles';

export default function GlobalCssOverride() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ h1: { color: 'grey' } }} />
      <h1>Grey h1 element</h1>
    </React.Fragment>
  );
}
