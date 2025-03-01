import apiClient from '../utils/apiClient';

export const fetchShops = accountId =>
  apiClient.get(`/accounts/${accountId}/shops`);
