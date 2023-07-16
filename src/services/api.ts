import axios from 'axios';
import { QueryClient } from 'react-query';
import MockAdapter from 'axios-mock-adapter';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const queryClient = new QueryClient();

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

const mock = new MockAdapter(api, {
  delayResponse: 200,
  onNoMatch: 'passthrough',
});

mock.onGet('/login').reply((config) => {
  const { username } = JSON.parse(config.data as string) as {
    username: string;
  };

  const access_token: string = Math.random().toString(36).substring(7);

  return [200, { access_token, user: { username } }];
});

export default api;
