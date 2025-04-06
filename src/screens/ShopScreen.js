import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ShopScreen = ({navigation}) => {
  const handleViewOrders = () => {
    const dummyShopId = 1; // Replace this with actual selected shop ID
    navigation.navigate('ShopOrders', {shopId: dummyShopId});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Shops</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Shop')}>
        <Text style={styles.buttonText}>Create New Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewOrders}>
        <Text style={styles.buttonText}>View Past Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  button: {
    backgroundColor: '#007bff', // Consistent blue color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default ShopScreen;
