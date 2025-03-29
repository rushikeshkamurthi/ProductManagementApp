import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import ShopApi from '../api/shopApi';

const CreateShopScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateShop = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a valid shop name');
      return;
    }

    if (!accountId.trim()) {
      Alert.alert('Error', 'Please enter a valid account ID');
      return;
    }

    setLoading(true);
    try {
      await ShopApi.createShop({name, accountId});
      Alert.alert('Success', 'Shop created successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Shop</Text>

      <TextInput
        placeholder="Enter Shop Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter Account ID"
        value={accountId}
        onChangeText={setAccountId}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button
        title={loading ? 'Creating...' : 'Create Shop'}
        onPress={handleCreateShop}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default CreateShopScreen;
