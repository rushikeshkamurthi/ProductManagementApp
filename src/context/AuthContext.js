import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signIn, signUp, refreshToken} from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStoredAuthData();
  }, []);

  const loadStoredAuthData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      if (storedUser && storedAccessToken) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
      }
    } catch (error) {
      console.error('Error loading auth data', error);
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      const data = await signIn(username, password);

      await AsyncStorage.setItem('user', JSON.stringify(data));
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      setUser(data);
      setAccessToken(data.accessToken);
    } catch (error) {
      throw error.message;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{user, accessToken, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
