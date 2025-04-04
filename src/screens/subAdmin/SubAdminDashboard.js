import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

const SubAdminDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Sub-Admin Dashboard" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome, Sub-Admin!</Text>
        <Text style={styles.subText}>
          Manage and oversee assigned data efficiently.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9', 
  },
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10, 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, 
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SubAdminDashboard;
