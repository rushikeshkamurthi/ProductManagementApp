import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const ProductListings = () => {
  return (
    <View style={styles.container}>
      <Header title="Shop Details" />
      <Text style={styles.text}>View assigned ProductListings details.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ProductListings;
