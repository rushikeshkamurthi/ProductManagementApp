import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import accountStore from '../store/accountStore';

const CreateAccountScreen = observer(() => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Account name cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      await accountStore.addAccount({name});
      Alert.alert('Success', 'Account created successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Creation Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Create Account</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
        placeholder="Account Name"
        value={name}
        onChangeText={setName}
      />
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: '#007bff',
          borderRadius: 5,
          alignItems: 'center',
        }}
        onPress={handleCreate}
        disabled={loading}>
        <Text style={{color: 'white', fontSize: 16}}>
          {loading ? 'Creating...' : 'Create'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default CreateAccountScreen;
