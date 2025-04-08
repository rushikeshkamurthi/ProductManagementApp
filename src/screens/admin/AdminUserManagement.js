import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import UserManagement from '../UserManagement';
import {useNavigation} from '@react-navigation/native';

const AdminUserManagement = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <UserManagement navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
});

export default AdminUserManagement;
