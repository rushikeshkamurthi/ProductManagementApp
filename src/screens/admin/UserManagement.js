import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import userStore from '../../store/userStore';
import {AuthContext} from '../../context/AuthContext';

const UserManagement = observer(({navigation}) => {
  const {user, logout} = useContext(AuthContext);

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

  if (userStore.loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }
  // add filter like account filters and role filter drodowns and search functionality

  return (
    <View style={{flex: 1, padding: 20}}>
      {userStore.error && <Text style={{color: 'red'}}>{userStore.error}</Text>}
      <FlatList
        data={userStore.users}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => (
          <View style={{padding: 10, borderBottomWidth: 1}}>
            <Text>Name: {item.username}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.roles.map(r => r.name).join(', ')}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('AddEditUser', {user: item})}
            />
            <Button
              title="Delete"
              onPress={() => handleDelete(item.id)}
              color="red"
            />
          </View>
        )}
      />
      <Button
        title="Add New User"
        onPress={() => navigation.navigate('AddEditUser')}
      />
      <Button title="Logout" onPress={logout} color="red" />
    </View>
  );
});

export default UserManagement;
