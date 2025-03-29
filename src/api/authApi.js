import apiClient from '../utils/apiClient';

export const signUp = async (username, email, password, accountId, role) => {
  try {
    const response = await apiClient.post('/auth/signup', {
      username,
      email,
      password,
      accountId,
      role,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signIn = async (username, password) => {
  try {
    console.log('trying to sign in');

    const response = await apiClient.post('/auth/signin', {
      username,
      password,
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const refreshToken = async refreshToken => {
  try {
    const response = await apiClient.post('/auth/refreshtoken', {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
