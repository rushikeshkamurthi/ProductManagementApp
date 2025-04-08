import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import productStore from '../store/productStore';

const ProductListScreen = observer(({navigation}) => {
  useEffect(() => {
    productStore.fetchProducts();
    console.log('productStore.products', productStore.products);
  }, []);

  if (productStore.loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (productStore.error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red', fontSize: 16}}>{productStore.error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={productStore.products.products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#f9f9f9',
              marginVertical: 5,
              borderRadius: 5,
            }}
            onPress={() =>
              navigation.navigate('ProductScreen', {productId: item.id})
            }>
            <Text style={{fontSize: 18}}>{item.name}</Text>
            <Text>Category: {item.category}</Text>
            <Text>Price: ${item.price}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: '#007bff',
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CreateProduct')}>
        <Text style={{color: 'white', fontSize: 16}}>Create Product</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ProductListScreen;
