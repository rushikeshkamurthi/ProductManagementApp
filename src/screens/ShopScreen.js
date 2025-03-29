import React from 'react';
import {View, Text, Button} from 'react-native';
import ShopList from '../components/ShopList';

const ShopScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, textAlign: 'center', marginVertical: 10}}>
        Your Shops
      </Text>
      <Button
        title="Create New order"
        onPress={() => navigation.navigate('Shop')}
      />
      <Text style={{fontSize: 24, textAlign: 'center', marginVertical: 10}}>
        All past orders
      </Text>
    </View>
  );
};

export default ShopScreen;
