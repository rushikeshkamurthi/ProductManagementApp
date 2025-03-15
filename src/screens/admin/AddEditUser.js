import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import userStore from '../../store/userStore';

const AddEditUser = ({route, navigation}) => {
  const existingUser = route.params?.user;

  // Default user values for new users
  const [username, setUsername] = useState(existingUser?.username || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [password, setPassword] = useState('');
  const [accountId, setAccountId] = useState(
    existingUser?.accountId ? existingUser.accountId.toString() : '',
  );

  const handleSubmit = () => {
    if (!username || !email || (!existingUser && !password) || !accountId) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    const userData = {
      username,
      email,
      ...(existingUser ? {} : {password}), // Only send password when creating a new user
      accountId: parseInt(accountId),
    };

    if (existingUser) {
      userStore.editUser(existingUser.id, userData);
      Alert.alert('Success', 'User updated successfully!');
    } else {
      userStore.addUser(userData);
      Alert.alert('Success', 'User added successfully!');
    }

    navigation.goBack();
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>
        {existingUser ? 'Edit User' : 'Add User'}
      </Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      {!existingUser && (
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{borderWidth: 1, marginBottom: 10, padding: 8}}
        />
      )}
      <TextInput
        placeholder="Account ID"
        value={accountId}
        onChangeText={setAccountId}
        keyboardType="numeric"
        style={{borderWidth: 1, marginBottom: 10, padding: 8}}
      />
      <Button
        title={existingUser ? 'Update User' : 'Create User'}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AddEditUser;
