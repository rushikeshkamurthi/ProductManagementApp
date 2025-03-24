import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const DashboardScreen = () => {
  const {user} = useContext(AuthContext);
  console.log('user', user);

  return (
    <View>
      <Text>Dashboard - Summary of Accounts, Shops, Products</Text>
    </View>
  );
};

export default DashboardScreen;
