import React, {useContext, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import CustomButton from '../common/CustomButton';
import {AuthContext} from '../context/AuthContext';
import styles from '../ScreenStyleSheet/LoginScreenStyle';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('password123');
  const [agree, setAgree] = useState(false);
  const {login} = useContext(AuthContext);

  const isFormValid = username.length > 0 && password.length >= 6 && agree;

  const handleLogin = async () => {
    console.log('Login button clicked!');
    if (!agree) {
      Alert.alert(
        'Error',
        'You must accept the Terms & Conditions to continue.',
      );
      return;
    }

    if (!isFormValid) {
      Alert.alert(
        'Error',
        'Please fill all fields and ensure your password is at least 6 characters.',
      );
      return;
    }

    try {
      await login(username, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
          <Text style={styles.appName}>Bill-GENIE</Text>
          <Text style={styles.subtitle}>India's No. 1 Business App</Text>
        </View>

        <TextInput
          style={[styles.input, {color: 'black'}]}
          placeholder="Enter your username"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, {color: 'black'}]}
          placeholder="Enter your password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Checkbox with clickable Terms & Conditions */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={agree ? 'checked' : 'unchecked'}
            onPress={() => setAgree(!agree)}
            color="#007bff"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={styles.checkboxText}>
              I agree to <Text style={styles.terms}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <CustomButton
          mode="contained"
          title="Login"
          onPress={handleLogin}
          disabled={!isFormValid}
          variant="primary"
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
        />

        {/* Sign Up Button */}
        <CustomButton
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
          variant="outline"
          style={styles.signUpButton}
          textStyle={styles.signUpButtonText}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
