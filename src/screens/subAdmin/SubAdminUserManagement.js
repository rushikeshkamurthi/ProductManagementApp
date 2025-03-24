import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const SubAdminUserManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="User Dashboard" />
      <Text style={styles.text}>Browse SubAdminUserManagement and shops.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default SubAdminUserManagement;
