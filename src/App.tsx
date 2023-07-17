import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { queryClient } from './services/api';
import AuthProvider from './stores/AuthContext';

const theme = createTheme();

const IS_DEV = process.env.NODE_ENV === 'development';

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
        {IS_DEV && <ReactQueryDevtools />}
      </QueryClientProvider>
    </>
  );
}

export default App;
