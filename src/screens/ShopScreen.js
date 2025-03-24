import React from 'react';
import {View, Text, Button} from 'react-native';
import ShopList from '../components/ShopList';

const ShopScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, textAlign: 'center', marginVertical: 10}}>
        Shops
      </Text>
      <ShopList navigation={navigation} />
      <Button
        title="Add New Shop"
        onPress={() => navigation.navigate('CreateShop')}
      />
    </View>
  );
};

export default ShopScreen;
