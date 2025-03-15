import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base API instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle Token Expiry
apiClient.interceptors.response.use(
  response => response, // Return the response if successful
  async error => {
    const originalRequest = error.config;

    // If the response status is 401 or 403, try refreshing the token
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Refresh token not found, please log in again');
        }

        const response = await axios.post(
          'http://localhost:8080/api/auth/refreshToken',
          {
            refreshToken: refreshToken,
          },
        );

        const {accessToken, refreshToken: newRefreshToken} = response.data;

        // Save new tokens
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);

        // Update the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
