import { expect } from 'chai';
import {
  toCssVar,
  CssVarsBuilder,
  makeCssVars,
  makeAliasVars,
  makeCssVarsTheme,
  generateGlobalVars,
} from './cssVars';

describe('CSS Vars', () => {
  describe('toCssVar', () => {
    it('turn string with dot notation to css var format', () => {
      expect(toCssVar('primary.main')).to.deep.equal('--primary-main');
    });
    it('turn array to css var', () => {
      expect(toCssVar(['primary', 'main'])).to.deep.equal('--primary-main');
    });
  });
  describe('CssVarsBuilder', () => {
    it('turn object into css vars format', () => {
      expect(
        CssVarsBuilder({
          color: '#000',
          fontFamily: 'Roboto',
        }),
      ).to.deep.equal({
        cssVars: {
          '--color': '#000',
          '--fontFamily': 'Roboto',
        },
        cssVarsMap: {
          color: 'var(--color)',
          fontFamily: 'var(--fontFamily)',
        },
      });
    });

    it('turn array into css vars format', () => {
      expect(CssVarsBuilder(['#000', '#fff'])).to.deep.equal({
        cssVars: {
          '--0': '#000',
          '--1': '#fff',
        },
        cssVarsMap: ['var(--0)', 'var(--1)'],
      });
    });

    it('skip values that are not string or number', () => {
      expect(
        CssVarsBuilder({
          shadows: ['0px 0px 2px 1px rgba(0,0,0,0.12)'],
          helper: () => 0,
          nested: {},
        }),
      ).to.deep.equal({
        cssVars: {},
        cssVarsMap: {},
      });
    });

    it('accept custom cssVar formatter', () => {
      expect(
        CssVarsBuilder(
          {
            color: '#000',
            fontFamily: 'Roboto',
          },
          {
            formatter: (key) => `--mui-${key.replace(/\./g, '-')}`,
          },
        ),
      ).to.deep.equal({
        cssVars: {
          '--mui-color': '#000',
          '--mui-fontFamily': 'Roboto',
        },
        cssVarsMap: {
          color: 'var(--mui-color)',
          fontFamily: 'var(--mui-fontFamily)',
        },
      });
    });
  });
  describe('makeCssVars', () => {
    it('transform plain object to css vars', () => {
      expect(
        makeCssVars({
          main: '#ff5252',
          light: '#ff5050',
        }),
      ).to.deep.equal({
        cssVars: {
          '--main': '#ff5252',
          '--light': '#ff5050',
        },
        cssVarsMap: {
          main: 'var(--main)',
          light: 'var(--light)',
        },
      });
    });

    it('transform nested object to css vars', () => {
      expect(
        makeCssVars({
          palette: {
            primary: {
              main: '#ff5252',
              light: '#ff5050',
            },
          },
        }),
      ).to.deep.equal({
        cssVars: {
          '--palette-primary-main': '#ff5252',
          '--palette-primary-light': '#ff5050',
        },
        cssVarsMap: {
          palette: {
            primary: {
              main: 'var(--palette-primary-main)',
              light: 'var(--palette-primary-light)',
            },
          },
        },
      });
    });

    it('transform nested object with only string | number value', () => {
      expect(
        makeCssVars({
          palette: {
            primary: {
              main: '#ff5252',
              light: '#ff5050',
            },
          },
          typography: {
            fontFamily: 'Roboto',
            pxToRem: () => '',
          },
          shadows: [
            '0px 0px 2px 1px rgba(0,0,0,0.12)',
            '0px 1px 3px 0px rgba(0,0,0,0.12)',
            '0px 2px 4px 0px rgba(0,0,0,0.12)',
          ],
          components: {},
        }),
      ).to.deep.equal({
        cssVars: {
          '--palette-primary-main': '#ff5252',
          '--palette-primary-light': '#ff5050',
          '--typography-fontFamily': 'Roboto',
          '--shadows-0': '0px 0px 2px 1px rgba(0,0,0,0.12)',
          '--shadows-1': '0px 1px 3px 0px rgba(0,0,0,0.12)',
          '--shadows-2': '0px 2px 4px 0px rgba(0,0,0,0.12)',
        },
        cssVarsMap: {
          palette: {
            primary: {
              main: 'var(--palette-primary-main)',
              light: 'var(--palette-primary-light)',
            },
          },
          typography: {
            fontFamily: 'var(--typography-fontFamily)',
          },
          shadows: ['var(--shadows-0)', 'var(--shadows-1)', 'var(--shadows-2)'],
        },
      });
    });
  });

  describe('makeAliasVars', () => {
    it('turn scheme object to css vars format', () => {
      expect(
        makeAliasVars({
          background: {
            light: 'var(--palette-neutral-50)',
            dark: 'var(--palette-neutral-900)',
          },
          surface: {
            light: 'var(--palette-neutral-100)',
            dark: 'var(--palette-neutral-800)',
          },
        }),
      ).to.deep.equal({
        themeCssVars: {
          light: {
            '--background': 'var(--palette-neutral-50)',
            '--surface': 'var(--palette-neutral-100)',
          },
          dark: {
            '--background': 'var(--palette-neutral-900)',
            '--surface': 'var(--palette-neutral-800)',
          },
        },
        cssVarsMap: {
          background: 'var(--background)',
          surface: 'var(--surface)',
        },
      });
    });

    it('accept formatter', () => {
      expect(
        makeAliasVars(
          {
            background: {
              light: 'var(--palette-neutral-50)',
            },
          },
          { formatter: (key) => `--mui-${key.replace(/\./g, '_')}` },
        ),
      ).to.deep.equal({
        themeCssVars: {
          light: {
            '--mui-background': 'var(--palette-neutral-50)',
          },
        },
        cssVarsMap: {
          background: 'var(--mui-background)',
        },
      });
    });
  });

  describe('makeCssVarsTheme', () => {
    it('create theme with css vars', () => {
      expect(
        makeCssVarsTheme(
          {
            light: {
              palette: { neutral: { 50: '#ff5252', 900: '#000' } },
            },
          },
          {
            alias: {
              background: {
                light: 'var(--palette-neutral-50)',
                dark: 'var(--palette-neutral-900)',
              },
            },
          },
        ),
      ).to.deep.equal({
        theme: {
          light: {
            palette: { neutral: { 50: '#ff5252', 900: '#000' } },
          },
          cssVarsMap: {
            palette: {
              neutral: {
                50: 'var(--palette-neutral-50)',
                900: 'var(--palette-neutral-900)',
              },
            },
            alias: {
              background: 'var(--background)',
            },
          },
        },
        tokenThemeVars: {
          light: {
            '--palette-neutral-50': '#ff5252',
            '--palette-neutral-900': '#000',
          },
        },
        aliasThemeVars: {
          dark: {
            '--background': 'var(--palette-neutral-900)',
          },
          light: {
            '--background': 'var(--palette-neutral-50)',
          },
        },
      });
    });
  });

  describe('generateGlobalVars', () => {
    it('create default tokens', () => {
      expect(generateGlobalVars({ light: 'light', dark: 'dark' })).to.deep.equal({
        ':root': 'light',
        '@media(prefers-color-scheme: light)': { ':root': 'light' },
        '@media(prefers-color-scheme: dark)': { ':root': 'dark' },
        '[data-theme="light"]': 'light',
        '[data-theme="dark"]': 'dark',
      });
    });

    it('use default theme if specify', () => {
      expect(
        generateGlobalVars({ light: 'light', dark: 'dark' }, { defaultSchemeKey: 'dark' }),
      ).to.deep.equal({
        ':root': 'dark',
        '@media(prefers-color-scheme: light)': { ':root': 'light' },
        '@media(prefers-color-scheme: dark)': { ':root': 'dark' },
        '[data-theme="light"]': 'light',
        '[data-theme="dark"]': 'dark',
      });
    });

    it('replace light and dark with other theme if specify', () => {
      expect(
        generateGlobalVars({ comfort: 'comfort', dim: 'dim' }, { light: 'comfort', dark: 'dim' }),
      ).to.deep.equal({
        ':root': 'comfort',
        '@media(prefers-color-scheme: light)': { ':root': 'comfort' },
        '@media(prefers-color-scheme: dark)': { ':root': 'dim' },
        '[data-theme="comfort"]': 'comfort',
        '[data-theme="dim"]': 'dim',
      });
    });

    it('support extra themes', () => {
      expect(
        generateGlobalVars({ light: 'light', dark: 'dark', comfort: 'comfort', dim: 'dim' }),
      ).to.deep.equal({
        ':root': 'light',
        '@media(prefers-color-scheme: light)': { ':root': 'light' },
        '@media(prefers-color-scheme: dark)': { ':root': 'dark' },
        '[data-theme="light"]': 'light',
        '[data-theme="dark"]': 'dark',
        '[data-theme="comfort"]': 'comfort',
        '[data-theme="dim"]': 'dim',
      });
    });
  });
});
