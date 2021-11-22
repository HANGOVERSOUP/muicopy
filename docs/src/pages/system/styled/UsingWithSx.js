import * as React from 'react';
import { styled, createTheme, ThemeProvider, unstable_sx as sx } from '@mui/system';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
  },
});

const MyThemeComponent = styled('div')(({ theme }) =>
  sx(
    {
      color: 'primary.contrastText',
      backgroundColor: 'primary.main',
      padding: 1,
      borderRadius: 1,
    },
    theme,
  ),
);

export default function ThemeUsage() {
  return (
    <ThemeProvider theme={customTheme}>
      <MyThemeComponent>Styled div with theme</MyThemeComponent>
    </ThemeProvider>
  );
}
