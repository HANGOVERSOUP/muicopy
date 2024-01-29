import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions, alpha } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}
}

export const brand = {
  50: '#F0F7FF',
  100: '#CEE5FD',
  200: '#9CCCFC',
  300: '#55A6F6',
  400: '#0A66C2',
  500: '#0959AA',
  600: '#064079',
  700: '#033363',
  800: '#02294F',
  900: '#021F3B',
};

export const secondary = {
  50: '#F9F0FF',
  100: '#E9CEFD',
  200: '#D49CFC',
  300: '#B355F6',
  400: '#750AC2',
  500: '#6709AA',
  600: '#490679',
  700: '#3B0363',
  800: '#2F024F',
  900: '#23023B',
};

export const gray = {
  50: '#FBFCFE',
  100: '#EAF0F5',
  200: '#D6E2EB',
  300: '#BFCCD9',
  400: '#94A6B8',
  500: '#5B6B7C',
  600: '#4C5967',
  700: '#364049',
  800: '#131B20',
  900: '#090E10',
};

export const green = {
  50: '#F6FEF6',
  100: '#E3FBE3',
  200: '#C7F7C7',
  300: '#A1E8A1',
  400: '#51BC51',
  500: '#1F7A1F',
  600: '#136C13',
  700: '#0A470A',
  800: '#042F04',
  900: '#021D02',
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      light: brand[300],
      main: brand[500],
      dark: brand[800],
      contrastText: brand[100],
      ...(mode === 'dark' && {
        contrastText: brand[100],
        light: brand[300],
        main: brand[500],
        dark: brand[800],
      }),
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[800],
      ...(mode === 'dark' && {
        light: secondary[400],
        main: secondary[500],
        dark: secondary[900],
      }),
    },
    warning: {
      main: '#F7B538',
      dark: '#F79F00',
      ...(mode === 'dark' && { main: '#F7B538', dark: '#F79F00' }),
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
      ...(mode === 'dark' && { light: '#D32F2F', main: '#D32F2F', dark: '#B22A2A' }),
    },
    success: {
      light: green[300],
      main: green[400],
      dark: green[800],
      ...(mode === 'dark' && {
        light: green[400],
        main: green[500],
        dark: green[700],
      }),
    },
    grey: {
      50: gray[50],
      100: gray[100],
      200: gray[200],
      300: gray[300],
      400: gray[400],
      500: gray[500],
      600: gray[600],
      700: gray[700],
      800: gray[800],
      900: gray[900],
    },
    background: {
      default: '#fff',
      paper: gray[50],
      ...(mode === 'dark' && { default: gray[900], paper: gray[800] }),
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
      ...(mode === 'dark' && { primary: '#fff', secondary: gray[300] }),
    },
    action: {
      selected: `${alpha(brand[100], 0.2)}`,
      ...(mode === 'dark' && {
        selected: alpha(brand[800], 0.2),
      }),
    },
  },
  typography: {
    fontFamily: ['"Inter", "sans-serif"'].join(','),
    h1: {
      fontWeight: 600,
      lineHeight: 78 / 70,
      fontSize: 60,
      letterSpacing: -0.2,
    },
    h2: {
      fontSize: 48,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 42,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: 36,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
    },
    body1: {
      fontWeight: 500,
      fontSize: '14px',
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
    },
  },
});

export default function getLPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
          disableGutters: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: '#fff',
            border: '1px solid',
            borderColor: gray[100],
            ':before': {
              backgroundColor: 'transparent',
            },
            '&:first-of-type': {
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            },
            '&:last-of-type': {
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            },
            ...theme.applyDarkStyles({
              backgroundColor: gray[900],
              borderColor: gray[800],
            }),
          }),
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            border: 'none',
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: { mb: 20, border: 'none' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            boxShadow: 'none',
            borderRadius: '10px',
            ...(ownerState.size === 'small' && {
              maxHeight: '32px',
            }),
            ...(ownerState.size === 'medium' && {
              height: '40px',
            }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: brand[50],
                background: `linear-gradient(to bottom, ${brand[400]}, ${brand[600]})`,
                boxShadow: `inset 0 1px ${alpha(brand[300], 0.4)}`,
                outline: `1px solid  ${brand[700]}`,
                '&:hover': {
                  background: `linear-gradient(to bottom, ${brand[400]}, ${brand[500]})`,
                  boxShadow: `0 0 0 1px  ${alpha(brand[300], 0.5)}`,
                },
              }),
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: alpha(brand[300], 0.1),
              borderColor: brand[300],
              color: brand[500],
              '&:hover': {
                backgroundColor: alpha(brand[300], 0.3),
                borderColor: brand[200],
              },
            }),
            ...(ownerState.variant === 'text' && {
              color: brand[500],
              '&:hover': {
                backgroundColor: alpha(brand[300], 0.3),
                borderColor: brand[200],
              },
            }),
            textTransform: 'none',
            '&:active': {
              transform: 'scale(0.98)',
            },
            ...theme.applyDarkStyles({
              ...(ownerState.variant === 'outlined' && {
                backgroundColor: alpha(brand[600], 0.1),
                borderColor: brand[700],
                color: brand[300],
                '&:hover': {
                  backgroundColor: alpha(brand[600], 0.3),
                  borderColor: brand[700],
                },
              }),
              ...(ownerState.variant === 'text' && {
                color: brand[300],
                '&:hover': {
                  backgroundColor: alpha(brand[600], 0.3),
                  borderColor: brand[700],
                },
              }),
            }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            backgroundColor: gray[50],
            borderRadius: '10px',
            border: `1px solid ${alpha(gray[200], 0.8)}`,
            boxShadow: 'none',
            ...(ownerState.variant === 'outlined' && {
              background: `linear-gradient(to bottom, ${gray[50]}, ${gray[100]})`,
              '&:hover': {
                borderColor: brand[300],
                boxShadow: `0 0 24px ${brand[100]}`,
              },
            }),
            ...theme.applyDarkStyles({
              backgroundColor: gray[900],
              border: `1px solid ${alpha(gray[700], 0.6)}`,
              ...(ownerState.variant === 'outlined' && {
                background: `linear-gradient(to bottom, ${gray[800]}, ${gray[900]})`,
                '&:hover': {
                  borderColor: brand[700],
                  boxShadow: `0 0 24px ${brand[800]}`,
                },
              }),
            }),
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            alignSelf: 'center',
            py: 1.5,
            px: 0.5,
            background: `linear-gradient(to bottom right, ${brand[50]}, ${brand[100]})`,
            border: '1px solid',
            borderColor: `${alpha(brand[500], 0.3)}`,
            fontWeight: '600',
            '&:hover': {
              backgroundColor: brand[500],
            },
            '&:focus-visible': {
              borderColor: brand[800],
              backgroundColor: brand[200],
            },
            '& .MuiChip-label': {
              color: brand[500],
            },
            '& .MuiChip-icon': {
              color: brand[500],
            },
            ...theme.applyDarkStyles({
              background: `linear-gradient(to bottom right, ${brand[700]}, ${brand[900]})`,
              borderColor: `${alpha(brand[500], 0.5)}`,
              '&:hover': {
                backgroundColor: brand[600],
              },
              '&:focus-visible': {
                borderColor: brand[200],
                backgroundColor: brand[600],
              },
              '& .MuiChip-label': {
                color: brand[200],
              },
              '& .MuiChip-icon': {
                color: brand[200],
              },
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: `${alpha(gray[200], 0.8)}`,
            ...theme.applyDarkStyles({
              borderColor: `${alpha(gray[700], 0.6)}`,
            }),
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            color: brand[500],
            fontWeight: 500,
            position: 'relative',
            textDecoration: 'none',
            '&::before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: '1px',
              bottom: 0,
              left: 0,
              backgroundColor: brand[200],
              opacity: 0.7,
              transition: 'width 0.3s ease, opacity 0.3s ease',
            },
            '&:hover::before': {
              width: '100%',
              opacity: 1,
            },
            ...theme.applyDarkStyles({
              color: brand[200],
            }),
          }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: '10px',
            color: gray[500],
            fontWeight: 500,
            ...theme.applyDarkStyles({
              color: gray[300],
            }),
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: gray[100],
            ...theme.applyDarkStyles({
              backgroundColor: gray[900],
            }),
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: 8,
            '& .MuiSwitch-switchBase': {
              '& + .MuiSwitch-track': {
                backgroundColor: brand[500],
                opacity: 1,
                border: '1px solid',
                borderColor: gray[400],
              },
            },
            '& .MuiSwitch-track': {
              borderRadius: 22 / 2,
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
              },
              '&::before': {
                left: 12,
              },
              '&::after': {
                left: 12,
              },
            },
            '& .MuiSwitch-thumb': {
              boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.5)',
              backgroundColor: brand[100],
              width: 16,
              height: 16,
              margin: 2,
            },
            ...theme.applyDarkStyles({
              '& .MuiSwitch-switchBase': {
                '& + .MuiSwitch-track': {
                  backgroundColor: brand[700],
                  opacity: 1,
                  border: '1px solid',
                  borderColor: gray[600],
                },
              },
              '& .MuiSwitch-track': {
                borderRadius: 22 / 2,
              },
              '& .MuiSwitch-thumb': {
                boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.5)',
                backgroundColor: brand[200],
                width: 16,
                height: 16,
                margin: 2,
              },
            }),
          }),
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& label.Mui-focused': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              '&::placeholder': {
                opacity: 0.7,
              },
              fontSize: '14px',
            },
            '& .MuiOutlinedInput-root': {
              height: '100%',
              minHeight: '40px',
              border: 'none',
              borderRadius: '10px',
              outline: `1px solid ${alpha(gray[500], 0.3)}`,
              '& fieldset': {
                border: 'none',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                background: `${alpha('#FFF', 0.3)}`,
              },
              '&:hover fieldset': {
                borderColor: gray[400],
              },
              '&.Mui-focused fieldset': {
                borderColor: brand[400],
              },
            },
            '& .MuiInputLabel-root': {
              fontSize: '14px',
            },
            ...theme.applyDarkStyles({
              '& .MuiOutlinedInput-root': {
                height: '100%',
                minHeight: '40px',
                border: 'none',
                borderRadius: '10px',
                outline: `1px solid ${alpha(gray[500], 0.6)}`,
                '& fieldset': {
                  border: 'none',
                  boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.4)',
                  background: `${alpha(gray[800], 0.4)}`,
                },
              },
            }),
          }),
        },
      },
    },
  };
}
