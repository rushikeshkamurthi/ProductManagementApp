import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header';
import ShopScreen from '../ShopScreen';

const MyShops = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ShopScreen navigation={navigation} />
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
    shadowOffset: {width: 0, height: 3},
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
