import { expect } from 'chai';
import transformDeprecatedThemeFormat from './transformDeprecatedThemeFormat';

describe('transformDeprecatedThemeFormat', () => {
  describe('props', () => {
    it('moves props, variants and overrides to components', () => {
      const theme = {
        props: {
          MuiButton: {
            disabled: true
          },
        },
        overrides: { 
          MuiTable: {
            root: {
              background: 'red',
            },
          },
        },
        variants: {
          MuiFab: [
            {
              props: { variant: 'dashed' },
              styles: {
                border: '1px dashed grey'
              },
            },
          ],
        },
      };

      const transformedTheme = transformDeprecatedThemeFormat(theme);
  
      expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
      expect(transformedTheme.components.MuiFab.variants).to.deep.equal(theme.variants.MuiFab);
      expect(transformedTheme.components.MuiTable.overrides).to.deep.equal(theme.overrides.MuiTable);
    })
  });

  it('merges props, variants and overrides to components', () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true
        },
      },
      overrides: { 
        MuiButton: {
          root: {
            background: 'red',
          },
        },
      },
      variants: {
        MuiButton: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey'
            },
          },
        ],
      },
    };

    const transformedTheme = transformDeprecatedThemeFormat(theme);

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.variants).to.deep.equal(theme.variants.MuiButton);
    expect(transformedTheme.components.MuiButton.overrides).to.deep.equal(theme.overrides.MuiButton);
  });

  it('merges props, variants and overrides from different components in appropriate key', () => {
    const theme = {
      props: {
        MuiButton: {
          disabled: true
        },
        MuiFab: {
          color: 'primary',
        },
      },
      overrides: { 
        MuiButton: {
          root: {
            background: 'red',
          },
        },
        MuiFab: {
          root: {
            color: 'red',
          },
        },
      },
      variants: {
        MuiButton: [
          {
            props: { variant: 'dashed' },
            styles: {
              border: '1px dashed grey'
            },
          },
        ],
        MuiFab: [
          {
            props: { variant: 'strong' },
            styles: {
              fontWeight: 'bold',
            },
          },
        ],
      },
    };

    const transformedTheme = transformDeprecatedThemeFormat(theme);

    expect(transformedTheme.components.MuiButton.props).to.deep.equal(theme.props.MuiButton);
    expect(transformedTheme.components.MuiButton.variants).to.deep.equal(theme.variants.MuiButton);
    expect(transformedTheme.components.MuiButton.overrides).to.deep.equal(theme.overrides.MuiButton);

    expect(transformedTheme.components.MuiFab.props).to.deep.equal(theme.props.MuiFab);
    expect(transformedTheme.components.MuiFab.variants).to.deep.equal(theme.variants.MuiFab);
    expect(transformedTheme.components.MuiFab.overrides).to.deep.equal(theme.overrides.MuiFab);
  });

});
