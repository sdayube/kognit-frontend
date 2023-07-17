import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Notifications from './Notifications';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNotifications } from '../services/notifications';

export default function Layout() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: notifications } = useNotifications(user?.id);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: 'flex',
                flexGrow: { xs: 1, md: 0 },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                }}
              >
                {notifications?.length ? (
                  <Badge badgeContent={notifications?.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                ) : (
                  <NotificationsIcon />
                )}
              </IconButton>
              <Tooltip title={user?.email}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.email}>
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Configurações</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    signOut();
                    navigate('/login');
                  }}
                >
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="main">
        <Outlet />
        <Notifications
          isOpen={isNotificationOpen}
          setIsOpen={setIsNotificationOpen}
        />
      </div>
    </Box>
  );
}
