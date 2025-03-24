import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const setToken = async token => {
  await AsyncStorage.setItem('token', token);
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('token');
};
