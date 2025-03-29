import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import ShopScreen from '../ShopScreen';

const pastOrders = [
  {
    id: 1,
    orderId: 'SWG12345',
    date: 'March 28, 2024',
    status: 'Delivered',
    items: [
      {name: 'Apples', quantity: 2, price: 100},
      {name: 'Bananas', quantity: 3, price: 90},
    ],
    totalAmount: 190,
  },
  {
    id: 2,
    orderId: 'SWG67890',
    date: 'March 25, 2024',
    status: 'Cancelled',
    items: [
      {name: 'Tomatoes', quantity: 1, price: 40},
      {name: 'Potatoes', quantity: 2, price: 50},
    ],
    totalAmount: 90,
  },
];

const MyShops = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Shop Management" />
      <Text style={styles.sectionTitle}>Manage your own shops</Text>
      <ShopScreen navigation={navigation} />

      <Text style={styles.sectionTitle}>My Past Orders</Text>
      <FlatList
        data={pastOrders}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', {order: item})}>
            <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
            <Text style={styles.orderDate}>{item.date}</Text>
            <Text style={styles.orderStatus}>{item.status}</Text>
            <Text style={styles.totalAmount}>₹{item.totalAmount}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},
  sectionTitle: {fontSize: 20, fontWeight: 'bold', marginVertical: 10},
  orderCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
    marginVertical: 5,
  },
  orderId: {fontSize: 16, fontWeight: 'bold'},
  orderDate: {color: 'gray'},
  orderStatus: {color: 'green', fontWeight: 'bold'},
  totalAmount: {fontSize: 18, fontWeight: 'bold', color: '#EC5228'},
});

export default MyShops;
