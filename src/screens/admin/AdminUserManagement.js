import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import UserManagement from '../UserManagement';

const AdminUserManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="User Dashboard" />
      
      <View style={styles.content}>
        <Text style={styles.heading}>Manage Users</Text>
        
        <View style={styles.card}>
          <UserManagement />
        </View>
      </View>
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
