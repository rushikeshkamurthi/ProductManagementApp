import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const EditProfileScreen = () => {
  const {user} = useContext(AuthContext);
  const [name, setName] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    console.log('Updated:', {name, email});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EditProfileScreen;
