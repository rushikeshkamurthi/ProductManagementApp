import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../ScreenStyleSheet/LoginScreenStyle';
import CustomButton from '../common/CustomButton';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [agree, setAgree] = useState(false);
  const {login} = useContext(AuthContext);

  const isFormValid = username.length > 0 && password.length >= 6 && checked;

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert(
        'Error',
        'Please fill all fields and accept Terms & Conditions.',
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
          <Pressable
            onPress={() => setAgree(!agree)}
            style={[styles.checkbox, agree && styles.checkedCheckbox]}>
            {agree && <Text style={styles.checkmark}>✔</Text>}
          </Pressable>
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={styles.checkboxText}>
              I agree to <Text style={styles.terms}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <CustomButton
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
