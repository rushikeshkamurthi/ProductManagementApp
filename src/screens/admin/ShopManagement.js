import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import ShopScreen from '../ShopScreen';
import {useNavigation} from '@react-navigation/native';

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
