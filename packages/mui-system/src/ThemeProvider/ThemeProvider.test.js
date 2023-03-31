import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { useTheme as usePrivateTheme } from '@mui/private-theming';
import { ThemeContext } from '@mui/styled-engine';
import ThemeProvider from './ThemeProvider';

const useEngineTheme = () => React.useContext(ThemeContext);

describe('ThemeProvider', () => {
  const { render } = createRenderer();

  it('should provide the theme to the mui theme context', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );

    expect(privateTheme).to.include({ foo: 'foo' });
    expect(engineTheme).to.include({ foo: 'foo' });
  });

  it('should provide the theme to the styled engine theme context', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }

    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(engineTheme).to.include({ foo: 'foo' });
    expect(privateTheme).to.include({ foo: 'foo' });
  });

  it('merge theme by default', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      bar: 'bar',
      [Symbol.for('mui.nested')]: true,
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      bar: 'bar',
      [Symbol.for('mui.nested')]: false,
    });
  });

  it('use provided theme from a callback', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider theme={(upperTheme) => ({ bar: upperTheme })}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      bar: { foo: 'foo', [Symbol.for('mui.nested')]: false },
      [Symbol.for('mui.nested')]: true,
    });
    expect(engineTheme).to.deep.equal({
      bar: { foo: 'foo', [Symbol.for('mui.nested')]: false },
      [Symbol.for('mui.nested')]: true, // mutated by the private ThemeProvider
    });
  });

  it('theme scope: theme should not change', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ foo: 'foo' }}>
        <Test />
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({ mui: { foo: 'foo' }, [Symbol.for('mui.nested')]: false });
    expect(engineTheme).to.deep.equal({ mui: { foo: 'foo' }, [Symbol.for('mui.nested')]: false });
  });

  it('theme scope: nested below general theme', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
          <Test />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { bar: 'bar' },
      [Symbol.for('mui.nested')]: true,
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { bar: 'bar' },
      [Symbol.for('mui.nested')]: false,
    });
  });

  it('theme scope: respect callback and merge theme', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider theme={{ foo: 'foo' }}>
        <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: order should not matter', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider theme={{ foo: 'foo' }}>
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <Test />
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
    expect(engineTheme).to.deep.equal({
      foo: 'foo',
      mui: { baz: { bar: 'bar' } },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: multiple identifiers', () => {
    let privateTheme;
    let engineTheme;

    function Test() {
      privateTheme = usePrivateTheme();
      engineTheme = useEngineTheme();

      return null;
    }

    let privateTheme2;
    let engineTheme2;

    function Test2() {
      privateTheme2 = usePrivateTheme();
      engineTheme2 = useEngineTheme();

      return null;
    }
    render(
      <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
        <ThemeProvider identifier="joy" theme={{ foo: 'foo' }}>
          <Test />
          <ThemeProvider identifier="mui" theme={(upperTheme) => ({ baz: upperTheme })}>
            <ThemeProvider identifier="joy" theme={(upperTheme) => ({ baz: upperTheme })}>
              <Test2 />
            </ThemeProvider>
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(privateTheme).to.deep.equal({
      mui: { bar: 'bar' },
      joy: { foo: 'foo' },
      [Symbol.for('mui.nested')]: true,
    });
    expect(privateTheme2).to.deep.equal({
      mui: { baz: { bar: 'bar' } },
      joy: { baz: { foo: 'foo' } },
      [Symbol.for('mui.nested')]: true,
    });

    expect(engineTheme).to.deep.equal({
      mui: { bar: 'bar' },
      joy: { foo: 'foo' },
      [Symbol.for('mui.nested')]: false,
    });
    expect(engineTheme2).to.deep.equal({
      mui: { baz: { bar: 'bar' } },
      joy: { baz: { foo: 'foo' } },
      [Symbol.for('mui.nested')]: true,
    });
  });

  it('theme scope: multiple identifiers with callback', () => {
    expect(() =>
      render(
        <ThemeProvider identifier="mui" theme={{ bar: 'bar' }}>
          <ThemeProvider identifier="joy" theme={(upperTheme) => ({ foo: upperTheme })} />
        </ThemeProvider>,
      ),
    ).toErrorDev([
      'MUI: You are providing a theme function prop to the ThemeProvider component:',
      '<ThemeProvider theme={outerTheme => outerTheme} />',
    ]);
  });
});
