import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import ShopScreen from '../ShopScreen';

const pastOrders = [
  {
    id: 1,
    orderId: 'SWG12345',
    date: 'March 28, 2024',
    status: 'Delivered',
    items: [
      { name: 'Apples', quantity: 2, price: 100 },
      { name: 'Bananas', quantity: 3, price: 90 },
    ],
    totalAmount: 190,
  },
  {
    id: 2,
    orderId: 'SWG67890',
    date: 'March 25, 2024',
    status: 'Cancelled',
    items: [
      { name: 'Tomatoes', quantity: 1, price: 40 },
      { name: 'Potatoes', quantity: 2, price: 50 },
    ],
    totalAmount: 90,
  },
];

const MyShops = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Shop Management" />
      <Text style={styles.sectionTitle}>Manage Your Shops</Text>
      <ShopScreen navigation={navigation} />

      <Text style={styles.sectionTitle}>My Past Orders</Text>
      <FlatList
        data={pastOrders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>#{item.orderId}</Text>
              <Text style={[styles.orderStatus, item.status === 'Cancelled' ? styles.cancelled : styles.delivered]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.orderDate}>{item.date}</Text>
            <Text style={styles.totalAmount}>Total: ₹{item.totalAmount}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F8F9FA',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  delivered: {
    color: '#28a745',
  },
  cancelled: {
    color: '#dc3545',
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC5228',
    marginTop: 5,
  },
});

export default MyShops;
