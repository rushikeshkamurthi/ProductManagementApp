import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const OrderDetailsScreen = ({route}) => {
  const {order} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text style={styles.orderId}>Order ID: {order.orderId}</Text>
      <Text style={styles.orderDate}>{order.date}</Text>
      <Text style={styles.orderStatus}>{order.status}</Text>

      <FlatList
        data={order.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x {item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.totalAmount}>Total Amount: ₹{order.totalAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 15, backgroundColor: '#fff'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  orderId: {fontSize: 16, fontWeight: 'bold'},
  orderDate: {color: 'gray'},
  orderStatus: {color: 'green', fontWeight: 'bold'},
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {fontSize: 16},
  itemQuantity: {color: 'gray'},
  itemPrice: {fontSize: 16, fontWeight: 'bold'},
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EC5228',
    marginTop: 10,
  },
});

export default OrderDetailsScreen;
