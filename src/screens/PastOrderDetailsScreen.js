// screens/OrderDetailsScreen.js
import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const PastOrderDetailsScreen = ({route}) => {
  const {order} = route.params;
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={styles.itemCard}>
      <View style={styles.rowBetween}>
        <Text style={styles.productName}>{item.product.name}</Text>
        <Text style={styles.price}>₹{item.priceAtOrderTime}</Text>
      </View>
      <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Order #{order.id}</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text>Status: {order.status}</Text>
        <Text>Total: ₹{order.totalAmount}</Text>
        <Text>User: {order.user?.username}</Text>
        <Text>Email: {order.user?.email}</Text>
        <Text>Date: {new Date(order.createdAt).toLocaleString()}</Text>
      </View>

      <Text style={styles.sectionTitle}>Ordered Items</Text>
      <FlatList
        data={order.items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 30}}
      />
    </View>
  );
};

export default PastOrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  orderInfo: {
    marginBottom: 20,
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemCard: {
    backgroundColor: '#fafafa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6600',
  },
  quantity: {
    marginTop: 4,
    color: '#555',
  },
});
