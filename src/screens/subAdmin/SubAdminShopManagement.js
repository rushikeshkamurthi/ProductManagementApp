import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

const SubAdminShopManagement = () => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <Header title="Sub-Admin Shop Management" />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>Manage Shops & Inventory</Text>
          <Text style={styles.subText}>
            Browse and manage shops under your administration.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9', // Light background for a clean look
  },
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10, // Keeps header above content
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, // Ensures content is below header
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5, // Adds shadow for depth
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SubAdminShopManagement;
