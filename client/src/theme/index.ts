// theme/index.ts
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
