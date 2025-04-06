import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {getShopOrders} from '../api/orderApi';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopOrdersScreen = ({route}) => {
  const {shopId} = route.params;
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getShopOrders(shopId);
        setOrders(data);
        console.log('orders', data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [shopId]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PastOrderDetails', {order: item})}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.price}>₹{item.totalAmount}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="shopping" size={18} color="#555" />
        <Text style={styles.items}> {item.items.length} items</Text>
      </View>
      <Text style={styles.timestamp}>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Your Past Orders</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ff6600"
          style={{marginTop: 30}}
        />
      ) : orders.length === 0 ? (
        <Text style={styles.noOrders}>No orders found 😔</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ShopOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
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
    color: '#333',
  },
  card: {
    backgroundColor: '#fefefe',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6600',
  },
  items: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    marginTop: 6,
    fontSize: 12,
    color: '#999',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  noOrders: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
});
