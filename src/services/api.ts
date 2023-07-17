import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClient } from 'react-query';
import { LoginCredentials } from '../stores/AuthContext';
import queryToObject from '../utils/helpers/convertQueryStringToObject';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const queryClient = new QueryClient();

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

const mock = new MockAdapter(api, {
  delayResponse: 2000,
  onNoMatch: 'passthrough',
});

mock.onPost('/login').reply((config) => {
  const queryString = config.data;
  const { email } = queryToObject<LoginCredentials>(queryString);

  const id = 1;
  const access_token = 'token';

  return [200, { id, email, access_token }];
});

export default api;
