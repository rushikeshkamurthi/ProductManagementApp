import apiClient from '../utils/apiClient';

// Helper function to handle API errors
const handleApiError = error => {
  console.error('API Error:', error);

  if (error.response) {
    // Server responded with a status code other than 2xx
    throw new Error(
      error.response.data.message || `Error: ${error.response.status}`,
    );
  } else if (error.request) {
    // Request was made, but no response received
    throw new Error('No response from server. Please try again.');
  } else {
    // Something else happened
    throw new Error('Request failed. Please check your network and try again.');
  }
};

export const getAccounts = async () => {
  try {
    const response = await apiClient.get('/accounts');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAccountById = async id => {
  try {
    const response = await apiClient.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createAccount = async accountData => {
  try {
    const response = await apiClient.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateAccount = async (id, accountData) => {
  try {
    const response = await apiClient.put(`/accounts/${id}`, accountData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteAccount = async id => {
  try {
    await apiClient.delete(`/accounts/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};
