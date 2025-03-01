import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = () => {
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setUser({email, role: 'ExternalAdmin'});
  };

  return (
    <View style={{padding: 16}}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
};

export default LoginScreen;
