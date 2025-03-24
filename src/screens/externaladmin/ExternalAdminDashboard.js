import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const ExternalAdminDashboard = () => {
  return (
    <View style={styles.container}>
      <Header title="External Admin Dashboard" />
      <Text style={styles.text}>Manage your own account here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ExternalAdminDashboard;
