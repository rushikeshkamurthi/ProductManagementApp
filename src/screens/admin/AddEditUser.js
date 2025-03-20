import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import userStore from '../../store/userStore';

const AddEditUser = ({route, navigation}) => {
  const existingUser = route.params?.user;

  // State variables
  const [username, setUsername] = useState(existingUser?.username || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [password, setPassword] = useState('');
  const [accountId, setAccountId] = useState(
    existingUser?.accountId ? existingUser.accountId.toString() : '',
  );
  const [role, setRole] = useState(existingUser?.role || '');

  // Hardcoded roles list
  const roles = [
    {id: 1, name: 'admin'},
    {id: 2, name: 'internal_admin'},
    {id: 3, name: 'internal_sub_admin'},
    {id: 4, name: 'internal_user'},
    {id: 5, name: 'external_admin'},
    {id: 6, name: 'external_sub_admin'},
    {id: 7, name: 'external_user'},
  ];

  const handleSubmit = () => {
    if (
      !username ||
      !email ||
      (!existingUser && !password) ||
      !accountId ||
      !role
    ) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    const userData = {
      username,
      email,
      ...(existingUser ? {} : {password}), // Only send password when creating a new user
      accountId: parseInt(accountId),
      role,
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

      {/* Role Dropdown */}
      <Text style={{marginTop: 10, fontSize: 16, fontWeight: 'bold'}}>
        Role
      </Text>
      <Picker
        selectedValue={role}
        onValueChange={itemValue => setRole(itemValue)}
        style={{borderWidth: 1, marginBottom: 10}}>
        <Picker.Item label="Select Role" value="" />
        {roles.map(roleItem => (
          <Picker.Item
            key={roleItem.id}
            label={roleItem.name}
            value={roleItem.name}
          />
        ))}
      </Picker>

      <Button
        title={existingUser ? 'Update User' : 'Create User'}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AddEditUser;
