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
          <View>
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
          </View>
        )}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  userCardContent: {
    flexDirection: 'row',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  info: {
    flex: 1,
    justifyContent: 'space-between',
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },

  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },

  userRole: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },

  actionButtonsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    backgroundColor: '#FF6F00',
  },

  deleteButton: {
    backgroundColor: '#E53935',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    borderColor: '#FF6F00',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginLeft: 10,
    borderColor: '#FF6F00',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  picker: {
    height: 45,
    color: '#333',
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  userRole: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  editButton: {
    backgroundColor: '#FF6F00',
  },
  deleteButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserManagement;
