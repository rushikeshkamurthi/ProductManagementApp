import apiClient from '../utils/apiClient';

export const fetchAccounts = () => apiClient.get('/accounts');
export const fetchAccountById = id => apiClient.get(`/accounts/${id}`);
