import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Alert} from 'react-native';
import {placeOrder} from '../../api/orderApi';

const PaymentScreen = ({route, navigation}) => {
  const {cart} = route.params;

  const handlePlaceOrder = async () => {
    const cartItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      const data = await placeOrder(cartItems);
      console.log('Order placed:', data);

      Alert.alert(
        'Success',
        data.message,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Receipt', {orderData: data}),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Order error:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Payment Method</Text>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentText}>💰 Cash on Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentButton}>
        <Text style={styles.paymentText}>💳 UPI / Card Payment</Text>
      </TouchableOpacity>

      <Text style={styles.qrText}>Scan QR Code for Payment</Text>
      <Image
        source={{uri: 'https://via.placeholder.com/150'}}
        style={styles.qrCode}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handlePlaceOrder}>
        <Text style={styles.confirmText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 15},
  paymentButton: {
    width: '90%',
    padding: 15,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentText: {fontSize: 18, fontWeight: 'bold'},
  qrText: {fontSize: 16, marginVertical: 10},
  qrCode: {width: 150, height: 150, marginBottom: 20},
  confirmButton: {backgroundColor: '#EC5228', padding: 15, borderRadius: 10},
  confirmText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});

export default PaymentScreen;
