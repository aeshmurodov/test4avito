import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useUiStore } from '../../store/uiStore';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton: boolean;
}

const Header = ({ onMenuClick, showMenuButton }: HeaderProps) => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {showMenuButton && (
          <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Панель модерации
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
