import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import accountStore from '../store/accountStore';

const AccountListScreen = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    accountStore.fetchAccounts();
  }, []);

  if (accountStore.loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Accounts</Text>
      <FlatList
        data={accountStore.accounts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: '#f9f9f9',
              marginVertical: 5,
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate('EditAccount', {account: item})}>
            <Text style={{fontSize: 18}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: '#007bff',
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={{color: 'white', fontSize: 16}}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
});

export default AccountListScreen;
