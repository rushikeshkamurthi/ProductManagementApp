import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
      await accountStore.addAccount({ name });
      Alert.alert('Success', 'Account created successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Creation Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Account Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />

      {loading && <ActivityIndicator size="large" color="#FF6F00" style={styles.loader} />}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleCreate}
        disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  loader: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6F00',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3, // Shadow effect for Android
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default CreateAccountScreen;
