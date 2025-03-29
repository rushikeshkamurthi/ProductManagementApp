import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProductDetails = ({route}) => {
  const {product} = route.params;

  return (
    <View style={styles.container}>
      <Image source={{uri: product.image}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
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
  image: {width: 200, height: 200, marginBottom: 20},
  title: {fontSize: 22, fontWeight: 'bold'},
  price: {fontSize: 20, color: '#EC5228'},
});

export default ProductDetails;
