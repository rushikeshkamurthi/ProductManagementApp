import React, {useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {user ? (
        <>
          <Text style={styles.detail}>Name: {user.username || 'N/A'}</Text>
          <Text style={styles.detail}>Email: {user.email || 'N/A'}</Text>
          <Text style={styles.detail}>Role: {user.roles[0] || 'N/A'}</Text>
        </>
      ) : (
        <Text style={styles.detail}>No user data available</Text>
      )}

      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
