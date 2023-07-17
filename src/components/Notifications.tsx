import { Edit, RemoveCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  Popover,
  Typography,
} from '@mui/material';
import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNotifications } from '../services/notifications';

export type NotificationsProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Notifications({
  isOpen,
  setIsOpen,
}: NotificationsProps) {
  const { user } = useAuth();
  const { data, isLoading } = useNotifications(user?.id);

  return (
    <Popover
      anchorReference="anchorPosition"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      anchorPosition={{
        top: window.innerHeight,
        left: window.innerWidth - window.innerWidth * 0.1,
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, height: '80vh', width: 600 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => {}}
            sx={{ mr: 2, textTransform: 'none' }}
            color="inherit"
            startIcon={<Edit />}
            size="large"
          >
            Editar Notificações
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            color="error"
            sx={{ px: 3 }}
            variant="contained"
            size="large"
          >
            Limpar
          </Button>
        </Box>
        <Divider sx={{ my: 1 }} />
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {isLoading && <CircularProgress />}
          {data &&
            data.map((notification, i, list) => (
              <React.Fragment key={notification.id}>
                <Box component={'li'} display="flex">
                  <Box flexGrow={1}>
                    <Typography variant="h6">{notification.title}</Typography>
                    <Typography variant="body1">{notification.body}</Typography>
                  </Box>
                  <Box alignSelf="center">
                    <IconButton
                      onClick={() => {}}
                      size="small"
                      sx={{
                        mr: 2,
                      }}
                      color="error"
                    >
                      <RemoveCircle />
                    </IconButton>
                  </Box>
                </Box>
                {i !== list.length - 1 && <Divider sx={{ my: 1 }} />}
              </React.Fragment>
            ))}
        </List>
      </Box>
    </Popover>
  );
}
