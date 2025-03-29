import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const OrderSummary = ({route, navigation}) => {
  const {cart} = route.params;

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} (x{item.quantity})
            </Text>
            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ₹{totalPrice}</Text>

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.payButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 15},
  item: {flexDirection: 'row', justifyContent: 'space-between', padding: 10},
  itemText: {fontSize: 18},
  itemPrice: {fontSize: 18, color: '#EC5228'},
  total: {fontSize: 22, fontWeight: 'bold', marginVertical: 15},
  payButton: {
    backgroundColor: '#3F7D58',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});

export default OrderSummary;
