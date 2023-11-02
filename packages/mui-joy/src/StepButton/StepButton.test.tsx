import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import StepButton, { stepButtonClasses as classes } from '@mui/joy/StepButton';

describe('<StepButton />', () => {
  const { render } = createRenderer();

  describeConformance(<StepButton />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    ThemeProvider,
    muiName: 'JoyStepButton',
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'div',
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));
});
