import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import accountStore from '../../store/accountStore';
import {toJS} from 'mobx'; // Import toJS from MobX

const AccountManagement = observer(() => {
  const navigation = useNavigation();

  // Fetch accounts when the component mounts
  useEffect(() => {
    accountStore.fetchAccounts();
    console.log('accountStore.accounts', accountStore.accounts);
  }, []);

  // Show loading indicator
  if (accountStore.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={accountStore.accounts}
        keyExtractor={item => item.id.toString()} // Ensure keys are strings
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.accountItem}
            onPress={
              () => navigation.navigate('EditAccount', {account: toJS(item)}) // Convert MobX object to plain JS object
            }>
            <Text style={styles.accountName}>{item.name.trim()}</Text>
            <Text style={styles.metaInfo}>
              Users: {item.users.length} | Shops: {item.shops.length}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  accountItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 5,
    borderRadius: 5,
  },
  accountName: {fontSize: 18, fontWeight: 'bold'},
  metaInfo: {fontSize: 14, color: 'gray'},
  createButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
});

export default AccountManagement;
