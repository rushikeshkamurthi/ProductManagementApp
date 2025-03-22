import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import UserManagement from '../UserManagement';

const AdminUserManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="User Dashboard" />
      <Text style={styles.text}></Text>
      <UserManagement></UserManagement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default AdminUserManagement;
