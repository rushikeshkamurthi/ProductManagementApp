import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';
import userStore from '../../store/userStore';

const AddEditUser = ({ route, navigation }) => {
  const existingUser = route.params?.user;

  // State variables
  const [username, setUsername] = useState(existingUser?.username || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [password, setPassword] = useState('');
  const [accountId, setAccountId] = useState(existingUser?.accountId ? existingUser.accountId.toString() : '');
  const [role, setRole] = useState(existingUser?.role || '');

  // Hardcoded roles list
  const roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'internal_admin' },
    { id: 3, name: 'internal_sub_admin' },
    { id: 4, name: 'internal_user' },
    { id: 5, name: 'external_admin' },
    { id: 6, name: 'external_sub_admin' },
    { id: 7, name: 'external_user' },
  ];

  const handleSubmit = () => {
    if (!username || !email || (!existingUser && !password) || !accountId || !role) {
      Alert.alert('Error', 'Please fill all fields!');
      return;
    }

    const userData = {
      username,
      email,
      ...(existingUser ? {} : { password }), // Only send password when creating a new user
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
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{existingUser ? 'Edit User' : 'Add User'}</Title>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            mode="outlined"
          />
          {!existingUser && (
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />
          )}
          <TextInput
            label="Account ID"
            value={accountId}
            onChangeText={setAccountId}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />

          <Text style={styles.label}>Role</Text>
          <Picker
            selectedValue={role}
            onValueChange={setRole}
            style={styles.picker}>
            <Picker.Item label="Select Role" value="" />
            {roles.map(roleItem => (
              <Picker.Item key={roleItem.id} label={roleItem.name} value={roleItem.name} />
            ))}
          </Picker>

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}>
            {existingUser ? 'Update User' : 'Create User'}
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    padding: 8,
  },
});

export default AddEditUser;