import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import ShopApi from '../../api/shopApi';

const ShopDetails = ({route, navigation}) => {
  const {shopId} = route.params;
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const response = await ShopApi.getShopById(shopId);
        setShop(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load shop details');
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopId]);

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this shop?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ShopApi.deleteShop(shopId);
              Alert.alert('Success', 'Shop deleted');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (!shop) {
    return <Text style={styles.errorText}>Shop not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{shop.name}</Text>
      <Text style={styles.subtitle}>Shop ID: {shop.id}</Text>

      <Button title="Delete Shop" color="red" onPress={handleDelete} />
      <View style={{marginTop: 10}}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ShopDetails;
