import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const {user, logout} = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <Image
          source={{uri: user?.avatar || 'https://via.placeholder.com/150'}}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>{user?.username || 'N/A'}</Text>
          <Text style={styles.email}>{user?.email || 'N/A'}</Text>
        </View>
      </View>

      {/* Profile Options */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('SavedAddresses')}>
        <Text style={styles.optionText}>Saved Addresses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('PaymentMethods')}>
        <Text style={styles.optionText}>Payment Methods</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('HelpSupport')}>
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.option, {backgroundColor: '#ff4d4d'}]}
        onPress={logout}>
        <Text style={styles.optionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 20},
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 1,
  },
  name: {fontSize: 20, fontWeight: 'bold'},
  email: {fontSize: 16, color: 'gray'},
  option: {
    padding: 15,
    backgroundColor: '#F8F8F8',
    marginVertical: 5,
    borderRadius: 8,
  },
  optionText: {fontSize: 18, fontWeight: '500'},
});

export default ProfileScreen;
