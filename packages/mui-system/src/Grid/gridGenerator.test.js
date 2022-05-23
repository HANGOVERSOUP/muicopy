import { expect } from 'chai';
import createSpacing from '../createTheme/createSpacing';
import createBreakpoints from '../createTheme/createBreakpoints';
import {
  traverseBreakpoints,
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridRowSpacingStyles,
  generateGridColumnSpacingStyles,
} from './gridGenerator';

const spacing = createSpacing();
const breakpoints = createBreakpoints({});

describe('grid generator', () => {
  describe('traverse breakpoints', () => {
    it('supports array', () => {
      const styles = {};
      traverseBreakpoints(breakpoints, [1, 2, 3, 4, 5], (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      });
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:600px)': {
          margin: 2,
        },
        '@media (min-width:900px)': {
          margin: 3,
        },
        '@media (min-width:1200px)': {
          margin: 4,
        },
        '@media (min-width:1536px)': {
          margin: 5,
        },
      });
    });

    it('supports object', () => {
      const styles = {};
      traverseBreakpoints(
        breakpoints,
        { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
        (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        },
      );
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:600px)': {
          margin: 2,
        },
        '@media (min-width:900px)': {
          margin: 3,
        },
        '@media (min-width:1200px)': {
          margin: 4,
        },
        '@media (min-width:1536px)': {
          margin: 5,
        },
      });
    });

    it('works with mixed object', () => {
      const styles = {};
      traverseBreakpoints(
        breakpoints,
        { a: 2, b: 5, xs: 1, sm: 2, md: 3, foo: () => {}, bar: [] },
        (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        },
      );
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:600px)': {
          margin: 2,
        },
        '@media (min-width:900px)': {
          margin: 3,
        },
      });
    });

    it('does not iterate undefined value', () => {
      const styles = {};
      traverseBreakpoints(breakpoints, { xs: 1, sm: undefined, md: 3 }, (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      });
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:900px)': {
          margin: 3,
        },
      });
    });

    describe('custom breakpoints', () => {
      const customBreakpoints = createBreakpoints({
        values: { xxs: 0, xs: 400, sm: 600, md: 768 },
      });

      it('supports array', () => {
        const styles = {};
        traverseBreakpoints(customBreakpoints, [1, 2, 3, 4, 5], (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        });
        expect(styles).to.deep.equal({
          margin: 1,
          '@media (min-width:400px)': {
            margin: 2,
          },
          '@media (min-width:600px)': {
            margin: 3,
          },
          '@media (min-width:768px)': {
            margin: 4,
          },
        });
      });

      it('supports object', () => {
        const styles = {};
        traverseBreakpoints(
          customBreakpoints,
          { xxs: 1, xs: 2, sm: 3, md: 4, lg: 5 }, // lg is not a part of custom breakpoints
          (appendStyle, value) => {
            appendStyle(styles, { margin: value });
          },
        );
        expect(styles).to.deep.equal({
          margin: 1,
          '@media (min-width:400px)': {
            margin: 2,
          },
          '@media (min-width:600px)': {
            margin: 3,
          },
          '@media (min-width:768px)': {
            margin: 4,
          },
        });
      });
    });

    describe('new breakpoints', () => {
      const newBreakpoints = createBreakpoints({
        values: {
          // order does not matter
          laptop: 1024,
          tablet: 640,
          mobile: 0,
          desktop: 1280,
        },
      });

      it('supports array', () => {
        const styles = {};
        traverseBreakpoints(newBreakpoints, [1, 2, 3, 4], (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        });
        expect(styles).to.deep.equal({
          margin: 1,
          '@media (min-width:640px)': {
            margin: 2,
          },
          '@media (min-width:1024px)': {
            margin: 3,
          },
          '@media (min-width:1280px)': {
            margin: 4,
          },
        });
      });

      it('supports object', () => {
        const styles = {};
        traverseBreakpoints(
          newBreakpoints,
          { mobile: 1, tablet: 2, laptop: 3, desktop: 4, monitor: 5 }, // monitor is not a part of custom breakpoints
          (appendStyle, value) => {
            appendStyle(styles, { margin: value });
          },
        );
        expect(styles).to.deep.equal({
          margin: 1,
          '@media (min-width:640px)': {
            margin: 2,
          },
          '@media (min-width:1024px)': {
            margin: 3,
          },
          '@media (min-width:1280px)': {
            margin: 4,
          },
        });
      });
    });
  });

  describe('generateGridSizeStyles', () => {
    it('works with supported format', () => {
      expect(
        generateGridSizeStyles({
          theme: { breakpoints },
          ownerState: {
            xs: 'auto',
            sm: 6,
            md: true,
            lg: 4,
            xl: 'auto',
            // should not consider other props
            rowSpacing: 1,
            columnSpacing: { xs: 1, sm: 2 },
          },
        }),
      ).to.deep.equal({
        flexBasis: 'auto',
        flexGrow: 0,
        flexShrink: 0,
        maxWidth: 'none',
        width: 'auto',
        '@media (min-width:600px)': {
          width: `calc(100% * 6 / var(--Grid-columns))`,
        },
        '@media (min-width:900px)': {
          flexBasis: 0,
          flexGrow: 1,
          maxWidth: '100%',
        },
        '@media (min-width:1200px)': {
          width: `calc(100% * 4 / var(--Grid-columns))`,
        },
        '@media (min-width:1536px)': {
          flexBasis: 'auto',
          flexGrow: 0,
          flexShrink: 0,
          maxWidth: 'none',
          width: 'auto',
        },
      });
    });
  });

  describe('generateGridColumnsStyles', () => {
    it('supports number', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: 16 },
        }),
      ).to.deep.equal({
        '--Grid-columns': 16,
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: { xs: 6, sm: 8, md: 12, lg: 16 } },
        }),
      ).to.deep.equal({
        '--Grid-columns': 6,
        '@media (min-width:600px)': {
          '--Grid-columns': 8,
        },
        '@media (min-width:900px)': {
          '--Grid-columns': 12,
        },
        '@media (min-width:1200px)': {
          '--Grid-columns': 16,
        },
      });
    });

    it('has default of 12 if the smallest breakpoint is not specified', () => {
      expect(
        generateGridColumnsStyles({
          theme: { breakpoints },
          ownerState: { container: true, columns: { lg: 16 } },
        }),
      ).to.deep.equal({
        '--Grid-columns': 12,
        '@media (min-width:1200px)': {
          '--Grid-columns': 16,
        },
      });
    });
  });

  describe('generateGridRowSpacingStyles', () => {
    it('supports number', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: 2 },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '16px',
      });
    });

    it('supports string', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: '1rem' },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '1rem',
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridRowSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, rowSpacing: { xs: 2, md: 3, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-rowSpacing': '16px',
        '@media (min-width:900px)': {
          '--Grid-rowSpacing': '24px',
        },
        '@media (min-width:1536px)': {
          '--Grid-rowSpacing': '0px',
        },
      });
    });
  });

  describe('generateGridColumnSpacingStyles', () => {
    it('supports number', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: 2 },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '16px',
      });
    });

    it('supports string', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: '1rem' },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '1rem',
      });
    });

    it('supports responsive', () => {
      expect(
        generateGridColumnSpacingStyles({
          theme: { breakpoints, spacing },
          ownerState: { container: true, columnSpacing: { xs: 2, md: 3, xl: 0 } },
        }),
      ).to.deep.equal({
        '--Grid-columnSpacing': '16px',
        '@media (min-width:900px)': {
          '--Grid-columnSpacing': '24px',
        },
        '@media (min-width:1536px)': {
          '--Grid-columnSpacing': '0px',
        },
      });
    });
  });
});
