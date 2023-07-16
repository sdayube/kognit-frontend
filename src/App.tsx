import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './services/api';
import AuthProvider from './stores/AuthContext';

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider></AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
