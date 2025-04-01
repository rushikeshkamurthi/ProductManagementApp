import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';

const DashboardScreen = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name || 'User'} 👋</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="users" size={30} color="#FF6F00" />
          <Text style={styles.cardText}>Total Accounts</Text>
          <Text style={styles.cardNumber}>12</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="shopping-cart" size={30} color="#007bff" />
          <Text style={styles.cardText}>Total Shops</Text>
          <Text style={styles.cardNumber}>8</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="archive" size={30} color="#28a745" />
          <Text style={styles.cardText}>Total Products</Text>
          <Text style={styles.cardNumber}>50</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 5,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
    color: '#333',
  },
});

export default DashboardScreen;
