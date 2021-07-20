import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Masonry from '@material-ui/lab/Masonry';
import MasonryItem, { masonryItemClasses as classes } from '@material-ui/lab/MasonryItem';

describe('<MasonryItem />', () => {
  const render = createClientRender();

  describeConformanceV5(<MasonryItem />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiMasonryItem',
    skip: ['componentsProp'],
  }));
});
