import React, { useState } from 'react';
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../ScreenStyleSheet/SignUpScreenStyle';
import Logo from '../assets/Logo.png';
import CustomButton from '../common/CustomButton';
import { signUp } from '../services/authService';

const SignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    accountId: '',
    role: '',
  });

  const [agree, setAgree] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const isFormValid =
    Object.values(form).every(value => value.length > 0) && agree;

  const handleSignup = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill all fields and accept Terms & Conditions.');
      return;
    }

    try {
      await signUp(
        form.username,
        form.email,
        form.password,
        form.accountId,
        form.role,
      );
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.appName}>Bill-GENIE</Text>
          <Text style={styles.subtitle}>India's No. 1 Business App</Text>
        </View>

        {Object.keys(form).map(key => (
          <TextInput
            key={key}
            style={[styles.input, { color: 'black' }]}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            placeholderTextColor="gray"
            value={form[key]}
            onChangeText={value => handleChange(key, value)}
            secureTextEntry={key === 'password'}
            keyboardType={key === 'email' ? 'email-address' : 'default'}
          />
        ))}

        {/* ✅ Custom Checkbox and Terms & Conditions Link */}
        <View style={styles.checkboxContainer}>
          <Pressable onPress={() => setAgree(!agree)} style={[styles.checkbox, agree && styles.checkedCheckbox]}>
            {agree && <Text style={styles.checkmark}>✔</Text>}
          </Pressable>
          <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text style={styles.checkboxText}>
              I agree to <Text style={styles.terms}>Terms and Conditions</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Buttons */}
        <CustomButton
          title="Sign Up"
          onPress={handleSignup}
          disabled={!isFormValid}
          variant="primary"
          style={[styles.signupButton, { backgroundColor: '#007BFF' }]}
          textStyle={[styles.signupButtonText, { color: 'white' }]}
        />

        <CustomButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          style={[
            styles.loginButton,
            { backgroundColor: 'white', borderWidth: 1, borderColor: '#007BFF' },
          ]}
          textStyle={[styles.loginButtonText, { color: '#007BFF' }]}
        />
      </View>
    </View>
  );
};

export default SignupScreen;
