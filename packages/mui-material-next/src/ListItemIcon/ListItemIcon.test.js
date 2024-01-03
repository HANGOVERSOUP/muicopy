import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import ListItemIcon, { listItemIconClasses as classes } from '@mui/material-next/ListItemIcon';
import { CssVarsProvider } from '@mui/material-next/styles';

describe('<ListItemIcon />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemIcon',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
      ThemeProvider: CssVarsProvider,
    }),
  );
});
