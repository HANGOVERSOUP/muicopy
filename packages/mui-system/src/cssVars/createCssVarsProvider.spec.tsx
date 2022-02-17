import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

// Test design system layer

type DesignSystemColorScheme = 'light' | 'dark';

interface Colors {
  palette: {
    primary: {
      500: string;
    };
  };
}

interface DesignSystemThemeInput {
  colorSchemes: Record<DesignSystemColorScheme, Colors>;
  fontSize: {
    md: string;
  };
}

createCssVarsProvider<DesignSystemThemeInput, DesignSystemColorScheme>({
  theme: {
    fontSize: {
      md: '1rem',
    },
    // @ts-expect-error 'dark' is missing
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
    },
  },
});

createCssVarsProvider<DesignSystemThemeInput, DesignSystemColorScheme>(
  // @ts-expect-error 'defaultColorScheme' is missing
  {
    theme: {
      fontSize: {
        md: '1rem',
      },
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: '#007FFF',
            },
          },
        },
        dark: {
          palette: {
            primary: {
              500: '#007FFF',
            },
          },
        },
      },
    },
  },
);

createCssVarsProvider<DesignSystemThemeInput, DesignSystemColorScheme>({
  theme: {
    fontSize: {
      md: '1rem',
    },
    // @ts-expect-error `lineHeight` is not in DesignSystemTheme
    lineHeight: {},
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
    },
  },
  // @ts-expect-error `yellow` is not in DesignSystemColorScheme
  defaultColorScheme: 'yellow',
});

createCssVarsProvider<DesignSystemThemeInput, DesignSystemColorScheme>({
  theme: {
    fontSize: {
      md: '1rem',
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            // @ts-expect-error `main` is not in Palette
            main: '#007FFF',
          },
        },
      },
    },
  },
  defaultColorScheme: 'dark',
});

// ==============================
// Test application layer
// 1. WITHOUT extending color scheme

interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

type JoyColorScheme = 'light' | 'dark';

interface JoyColors {
  palette: {
    primary: {
      main: string;
    };
  };
}

interface JoyThemeInput {
  colorSchemes: Record<JoyColorScheme, JoyColors>;
  fontSize: string;
  fontFamily: string;
}

interface ApplicationThemeInput {
  colorSchemes: Record<JoyExtendedColorScheme, JoyColors>;
  fontSize: string;
  fontFamily: string;
}

const { CssVarsProvider } = createCssVarsProvider<
  JoyThemeInput,
  JoyColorScheme,
  ApplicationThemeInput,
  JoyExtendedColorScheme
>({
  theme: {
    fontSize: '1rem',
    fontFamily: 'IBM Plex Sans',
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#007FFF',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#007FFF',
          },
        },
      },
    },
  },
  defaultColorScheme: 'light',
});

function App() {
  return (
    <CssVarsProvider
      theme={{
        fontSize: '14px',
        fontFamily: 'system',
      }}
    />
  );
}

function App2() {
  return (
    <CssVarsProvider
      theme={{
        // colorSchemes must be optional, if color schemes are not extended
        fontSize: '12px',
        // @ts-expect-error `lineHeight` is not in theme
        lineHeight: 1,
      }}
    />
  );
}

// =========================
// 1. WITH extending color scheme
//    When developers extend new color schemes, they have to specify those new color schemes in the theme.

interface Joy2ColorSchemeOverrides {}

type Joy2ExtendedColorScheme = OverridableStringUnion<never, Joy2ColorSchemeOverrides>;

type Joy2ColorScheme = 'light' | 'dark';

interface Joy2Colors {
  palette?: {
    primary?: {
      main?: string;
    };
  };
}

interface Joy2ThemeInput {
  colorSchemes: Record<Joy2ColorScheme, Joy2Colors>;
  fontSize: string;
  fontFamily: string;
}

interface Application2ThemeInput {
  colorSchemes: Record<Joy2ExtendedColorScheme, Joy2Colors>;
  fontSize: string;
  fontFamily: string;
}

// Simulate color scheme extending, same as module augmentation in real application
interface Joy2ColorSchemeOverrides {
  comfort: true;
  trueDark: true;
}

const { CssVarsProvider: CssVarsProvider2, useColorScheme } = createCssVarsProvider<
  Joy2ThemeInput,
  Joy2ColorScheme,
  Application2ThemeInput,
  Joy2ExtendedColorScheme
>({
  theme: {
    fontSize: '1rem',
    fontFamily: 'IBM Plex Sans',
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#007FFF',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#007FFF',
          },
        },
      },
    },
  },
  defaultColorScheme: 'light',
});

function Content() {
  const { setColorScheme } = useColorScheme();
  React.useEffect(() => {
    // @ts-expect-error 'yellow' is not typed in JoyExtendedColorScheme
    setColorScheme('yellow');

    setColorScheme('comfort');
  }, [setColorScheme]);
  return null;
}

function App3() {
  return (
    <CssVarsProvider2
      theme={{
        // @ts-expect-error `comfort` and `trueDark` are missing
        colorSchemes: {},
      }}
    />
  );
}

function App4() {
  return (
    <CssVarsProvider2
      theme={{
        colorSchemes: {
          comfort: {},
          trueDark: {},
        },
        fontSize: '12px',
        fontFamily: 'system',
      }}
      // @ts-expect-error `yellow` is not an extended color scheme
      defaultColorScheme="yellow"
    />
  );
}
