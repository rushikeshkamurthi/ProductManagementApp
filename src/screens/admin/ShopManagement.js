import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

const ShopManagement = () => {
  return (
    <View style={styles.container}>
      <Header title="Shop Management" />
      <Text style={styles.text}>View and assign shops to accounts.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ShopManagement;
