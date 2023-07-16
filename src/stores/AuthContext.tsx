import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import api from '../services/api';
import { AxiosError } from 'axios';

export type User = {
  username: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

export interface AuthContextData {
  user: User | null;
  signIn(credentials: SignInCredentials): Promise<User | null>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: () => Promise.resolve(null),
  signOut: () => {},
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.interceptors.request.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          sessionStorage.removeItem('@KOGNIT:token');
          window.location.href = '/login';
        }

        return Promise.reject(error);
      },
    );

    api.interceptors.request.use((request) => {
      const token = localStorage.getItem('token');
      request.headers.Authorization = token ? `Bearer ${token}` : '';

      return request;
    });

    api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (
          error.response?.status === 401 &&
          window.location.pathname !== '/login'
        ) {
          signOut();
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }

        return Promise.reject(error);
      },
    );
  }, []);

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const formData = new FormData();

      formData.append('username', username);
      formData.append('password', password);

      const value = Object.fromEntries(formData.entries());

      const { data } = await api.post<User & { access_token: string }>(
        '/login',
        value,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token: token, ...returnedUser } = data;

      setUser(returnedUser);

      localStorage.setItem('user', JSON.stringify(returnedUser));
      localStorage.setItem('token', token);

      return returnedUser;
    },
    [],
  );

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
