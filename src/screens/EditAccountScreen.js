import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import accountStore from '../store/accountStore';

const EditAccountScreen = observer(() => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params.account;
  const [name, setName] = useState(account.name);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (name.trim() === '') {
      Alert.alert('Validation Error', 'Account name cannot be empty.');
      return;
    }

    try {
      setLoading(true);
      await accountStore.editAccount(account.id, {name});
      Alert.alert('Success', 'Account updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await accountStore.removeAccount(account.id);
              Alert.alert('Success', 'Account deleted.');
              navigation.goBack();
            } catch (error) {
              Alert.alert(
                'Deletion Failed',
                error.message || 'Something went wrong.',
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>Edit Account</Text>
      <TextInput
        style={{borderWidth: 1, padding: 10, marginVertical: 10}}
        value={name}
        onChangeText={setName}
      />
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      <TouchableOpacity
        onPress={handleUpdate}
        disabled={loading}
        style={{marginVertical: 10}}>
        <Text style={{fontSize: 16, color: 'blue'}}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        disabled={loading}
        style={{marginVertical: 10}}>
        <Text style={{fontSize: 16, color: 'red'}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
});

export default EditAccountScreen;
