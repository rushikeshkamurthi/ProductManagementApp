import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import ShopScreen from '../ShopScreen';

const ExternalShopManagement = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Shop Management" />
      <Text style={styles.text}>Manage your own shops.</Text>
      <ShopScreen navigation={navigation}></ShopScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ExternalShopManagement;
