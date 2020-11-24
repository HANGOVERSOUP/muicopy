/* eslint-disable no-console */
import Benchmark from 'benchmark';
import { unstable_styleFunctionSx as styleFunction } from '@material-ui/system';
import css from '@styled-system/css';
import { createMuiTheme } from '@material-ui/core/styles';

const suite = new Benchmark.Suite('system', {
  onError: (event) => {
    console.log(event.target.error);
  },
});
Benchmark.options.minSamples = 100;

const materialSystemTheme = createMuiTheme();

const styledSystemTheme = {
  breakpoints: ['40em', '52em', '64em'],
  colors: {
    primary: materialSystemTheme.palette.primary,
    background: materialSystemTheme.palette.background,
  },
  fontSizes: materialSystemTheme.typography,
  fonts: materialSystemTheme.typography,
};

const styledSystemCSSFunction = css({
  theme: styledSystemTheme,
  color: 'primary.main',
  bg: 'background.paper',
  fontFamily: 'h6.fontFamily',
  fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
  p: [2, 3, 4],
});

suite
  // ---
  .add('@styled-system/css', () => {
    styledSystemCSSFunction({
      theme: styledSystemTheme,
      color: 'primary.main',
      bg: 'background.paper',
      fontFamily: 'h6.fontFamily',
      fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
      p: [2, 3, 4],
    });
  })
  // ---
  .add('@material-ui/core all-inclusive', () => {
    styleFunction({
      theme: materialSystemTheme,
      sx: {
        color: 'primary.main',
        bgcolor: 'background.paper',
        fontFamily: 'h6.fontFamily',
        fontSize: ['h6.fontSize', 'h4.fontSize', 'h3.fontSize'],
        p: [2, 3, 4],
      },
    });
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
