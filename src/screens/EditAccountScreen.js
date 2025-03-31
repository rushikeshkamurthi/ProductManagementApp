import { useNavigation, useRoute } from '@react-navigation/native';
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
      await accountStore.editAccount(account.id, { name });
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
        { text: 'Cancel', style: 'cancel' },
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
                error.message || 'Something went wrong.'
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Account</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Enter account name"
          value={name}
          onChangeText={setName}
        />
        {loading ? <ActivityIndicator size="large" color="#007bff" /> : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007bff' }]}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#dc3545' }]}
          onPress={handleDelete}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Deleting...' : 'Delete'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAccountScreen;
