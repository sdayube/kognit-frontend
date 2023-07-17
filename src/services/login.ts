import { useMutation } from 'react-query';
import { User } from '../stores/AuthContext';
import api from './api';

const login = async (credentials: { [k: string]: FormDataEntryValue }) => {
  const { data } = await api.post<User & { access_token: string }>(
    '/login',
    credentials,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return data;
};

export const useLogin = () => {
  return useMutation((credentials: { [k: string]: FormDataEntryValue }) =>
    login(credentials),
  );
};
