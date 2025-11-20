import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Toolbar, Fade, useMediaQuery } from '@mui/material';
import { useUiStore } from '../../store/uiStore';
import { lightTheme, darkTheme } from '../../theme';
import Header from './Header';
import Sidebar from './Sidebar';
import { useState, useMemo } from 'react';

const AppLayout = () => {
  const { theme } = useUiStore();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const isDesktop = useMediaQuery(currentTheme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const contentKey = useMemo(() => location.pathname, [location.pathname]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Header
          onMenuClick={() => setMobileOpen((prev) => !prev)}
          showMenuButton={!isDesktop}
        />
        <Sidebar
          variant={isDesktop ? 'permanent' : 'temporary'}
          open={isDesktop ? true : mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <Fade in appear key={contentKey} timeout={300} mountOnEnter unmountOnExit>
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
            <Toolbar />
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
