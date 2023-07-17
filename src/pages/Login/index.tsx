import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Avatar,
  Box,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Copyright } from '../../components/Copyright';
import useAuth from '../../hooks/useAuth';
import { LoginCredentials } from '../../stores/AuthContext';
import schema from './schema';

export default function Login() {
  const navigate = useNavigate();
  const { user, signIn, isLoading } = useAuth();

  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object(schema).required()),
  });

  async function handleLogin({ email, password }: LoginCredentials) {
    try {
      await signIn({
        email,
        password,
      });
    } catch (e) {
      console.error(e);

      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          setError('Login não autorizado');
        } else {
          setError('Ocorreu um erro ao tentar fazer login');
        }
      }
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setError('')}
          severity="error"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Teste Kognit - Login
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  autoComplete="email"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  margin="normal"
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueci a senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Criar uma conta'}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
