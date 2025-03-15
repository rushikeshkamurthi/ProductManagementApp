import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const ProductManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="Product Management" />
      <Text style={styles.text}>Edit and delete products.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ProductManagement;
