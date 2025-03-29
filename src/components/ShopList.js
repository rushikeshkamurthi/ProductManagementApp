import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useShopStore} from '../store/shopStore';

const ShopList = ({navigation}) => {
  const {shops, loading, error} = useShopStore();
  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        data={shops}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{padding: 15, borderBottomWidth: 1, borderColor: '#ddd'}}
            onPress={() =>
              navigation.navigate('ShopDetails', {shopId: item.id})
            }>
            <Text style={{fontSize: 18}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ShopList;
