import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '../stores/AuthContext';

export default function useAuth(): AuthContextData {
  const signIn = useContextSelector(AuthContext, (state) => state.signIn);
  const signOut = useContextSelector(AuthContext, (state) => state.signOut);
  let user = useContextSelector(AuthContext, (state) => state.user);
  const isLoading = useContextSelector(AuthContext, (state) => state.isLoading);

  if (!user) {
    const userFromStorage = localStorage.getItem('user');

    if (userFromStorage) {
      user = JSON.parse(userFromStorage);
    }
  }

  const context = {
    user,
    signIn,
    signOut,
    isLoading,
  };

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
