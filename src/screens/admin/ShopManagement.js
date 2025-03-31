import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ShopScreen from '../ShopScreen';

const ShopManagement = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ShopScreen navigation={navigation}></ShopScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ShopManagement;
