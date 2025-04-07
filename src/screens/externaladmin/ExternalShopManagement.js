import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import ShopApi from '../../api/shopApi';

const ExternalShopManagement = () => {
  const navigation = useNavigation();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    try {
      const res = await ShopApi.getShops();
      setShops(res.data.shops || []);
    } catch (err) {
      console.error('Error fetching shops:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchShops);
    return unsubscribe;
  }, [navigation]);

  const renderShopCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ShopDetailsScreen', {shop: item})}>
      <Text style={styles.shopName}>{item.name}</Text>
      <Text style={styles.meta}>Shop ID: {item.id}</Text>
      <Text style={styles.meta}>
        Created At: {new Date(item.createdAt).toDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Shop Management" />

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateShop')}>
        <Text style={styles.buttonText}>+ Create New Shop</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF6F00"
          style={{marginTop: 20}}
        />
      ) : (
        <>
          {shops.length === 0 ? (
            <Text style={styles.noDataText}>No shops available.</Text>
          ) : (
            <FlatList
              data={shops}
              keyExtractor={item => item.id.toString()}
              renderItem={renderShopCard}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  createButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  meta: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ExternalShopManagement;
