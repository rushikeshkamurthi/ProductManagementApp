import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import userStore from '../store/userStore';
import {Picker} from '@react-native-picker/picker';

const roleColors = {
  external_admin: '#FF6F00',
  external_user: '#4CAF50',
};

const UserManagement = observer(({navigation}) => {
  const {logout} = useContext(AuthContext);

  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    userStore.fetchUsers();
  }, []);

  const handleDelete = id => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => userStore.removeUser(id),
        style: 'destructive',
      },
    ]);
  };

  const filteredUsers = userStore.users.filter(user => {
    console.log('filteredUsers', user);
    const matchSearch =
      user.username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());

    const matchRole =
      selectedRole === 'all' ||
      user.roles.some(role => role.name === selectedRole);

    return matchSearch && matchRole;
  });

  if (userStore.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userStore.error && (
        <Text style={styles.errorText}>{userStore.error}</Text>
      )}

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by username or email"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedRole}
            style={styles.picker}
            onValueChange={itemValue => setSelectedRole(itemValue)}>
            <Picker.Item label="All Roles" value="all" />
            <Picker.Item label="External Admin" value="external_admin" />
            <Picker.Item label="External User" value="external_user" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.userCardContent}>
            <Image
              source={{
                uri: 'https://bootdey.com/img/Content/avatar/avatar1.png',
              }}
              style={styles.avatar}
            />

            <View style={styles.info}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UserInfoScreen', {user: toJS(item)})
                }>
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text
                  style={[
                    styles.userRole,
                    {color: roleColors[item.roles[0]?.name]},
                  ]}>
                  {item.roles
                    .map(r => r.name.replace(/_/g, ' ').toUpperCase())
                    .join(', ')}
                </Text>
              </TouchableOpacity>
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() =>
                    navigation.navigate('AddEditUser', {user: toJS(item)})
                  }>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditUser')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    backgroundColor: '#FF6F00',
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabIcon: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  createUserButton: {
    backgroundColor: '#FF6F00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 10,
  },
  createUserButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  picker: {
    width: '100%',
  },
  userCardContent: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  info: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userEmail: {
    color: 'gray',
  },
  userRole: {
    fontSize: 14,
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserManagement;
