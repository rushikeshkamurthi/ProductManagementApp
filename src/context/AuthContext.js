import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { signIn } from '../api/authApi';

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
    console.log("API Response:", data); // ✅ Debugging log

    if (!data.accessToken) {
      throw new Error("Invalid response: Missing accessToken");
    }

    await AsyncStorage.setItem("user", JSON.stringify(data));
    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);

    setUser(data); // ✅ Directly updating AuthContext
  } catch (error) {
    console.error("Login Failed:", error);
    throw error;
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
