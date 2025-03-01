import apiClient from '../utils/apiClient';

export const login = credentials => apiClient.post('/auth/login', credentials);
export const fetchProfile = () => apiClient.get('/auth/profile');
export const logout = () => apiClient.post('/auth/logout');
