import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const SubAdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Header title="Sub-Admin Dashboard" />
      <Text style={styles.text}>Manage assigned data.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default SubAdminDashboard;
