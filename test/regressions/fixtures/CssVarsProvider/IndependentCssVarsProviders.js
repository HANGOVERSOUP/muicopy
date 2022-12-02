import * as React from 'react';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  theme: {
    colorSchemes: {
      light: {
        background: {
          default: 'red',
        },
      },
      dark: {
        background: {
          default: 'blue',
        },
      },
    },
  },
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

const nestedTheme = {
  cssVarPrefix: 'nested',
  colorSchemes: {
    light: {
      background: {
        default: 'yellow',
      },
    },
    dark: {
      background: {
        default: 'cyan',
      },
    },
  },
};

function DarkMode() {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode('dark');
  }, [setMode]);
  return null;
}

export default function IndependentCssVarsProviders() {
  return (
    <CssVarsProvider>
      <div
        style={{
          background: 'var(--background-default)',
          color: 'white',
          padding: '1rem',
        }}
      >
        Background should be red.
        {/* If `disableNestedContext` is true, the upper CssVarsProvider should be independent */}
        <CssVarsProvider theme={nestedTheme} disableNestedContext>
          <DarkMode />
          <div
            style={{
              background: 'var(--background-default)',
              height: 40,
              color: '#000',
              padding: '1rem',
            }}
          >
            Background should be cyan.
          </div>
        </CssVarsProvider>
      </div>
    </CssVarsProvider>
  );
}
