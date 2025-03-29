import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react-lite';
import productStore from '../store/productStore';

const ProductScreen = observer(({route, navigation}) => {
  const {productId} = route.params;

  useEffect(() => {
    productStore.fetchProductById(productId);
  }, [productId]);

  if (productStore.loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!productStore.selectedProduct) {
    return <Text>Product not found.</Text>;
  }

  const {name, category, subcategory, type, price} =
    productStore.selectedProduct;

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>{name}</Text>
      <Text>Category: {category}</Text>
      <Text>Subcategory: {subcategory}</Text>
      <Text>Type: {type}</Text>
      <Text>Price: ${price}</Text>

      <Button
        title="Delete Product"
        onPress={() => {
          productStore.deleteProduct(productId);
          navigation.goBack();
        }}
      />
    </View>
  );
});

export default ProductScreen;
