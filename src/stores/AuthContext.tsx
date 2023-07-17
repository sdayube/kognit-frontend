import { AxiosError } from 'axios';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import api from '../services/api';
import { useLogin } from '../services/login';

export type User = {
  email: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface AuthContextData {
  user: User | null;
  signIn(credentials: LoginCredentials): Promise<User | null>;
  signOut(): void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signIn: () => Promise.resolve(null),
  signOut: () => {},
  isLoading: false,
});

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { mutateAsync, isLoading } = useLogin();

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
    async ({ email, password }: LoginCredentials) => {
      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);

      const value = Object.fromEntries(formData.entries());

      const data = await mutateAsync(value);

      console.log(data);

      const { access_token: token, ...returnedUser } = data;

      setUser(returnedUser);

      localStorage.setItem('user', JSON.stringify(returnedUser));
      localStorage.setItem('token', token);

      return returnedUser;
    },
    [mutateAsync],
  );

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
