import { useQuery } from 'react-query';
import { Notification } from '../types/Notification';
import api from './api';

const getNotifications = async (userId: number) => {
  const { data } = await api.get<Notification[]>(`/posts?userId=${userId}`);

  return data;
};

export const useNotifications = (userId?: number) => {
  return useQuery(['notifications', userId], () => getNotifications(userId!), {
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: Boolean(userId),
  });
};
