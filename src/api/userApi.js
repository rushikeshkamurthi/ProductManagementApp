import apiClient from '../utils/apiClient';

// Fetch all users
export const getAllUsers = async () => {
  return await apiClient.get('/users');
};

// Fetch a single user by ID
export const getUserById = async id => {
  return await apiClient.get(`/users/${id}`);
};

// Create a new user
export const createUser = async userData => {
  return await apiClient.post('/users', userData);
};

// Update user details
export const updateUser = async (id, userData) => {
  return await apiClient.put(`/users/${id}`, userData);
};

// Delete a user
export const deleteUser = async id => {
  return await apiClient.delete(`/users/${id}`);
};
