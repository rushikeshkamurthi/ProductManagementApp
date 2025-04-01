import { useNavigation } from '@react-navigation/native';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import accountStore from '../../store/accountStore';

const AccountManagement = observer(() => {
  const navigation = useNavigation();

  useEffect(() => {
    accountStore.fetchAccounts();
  }, []);

  if (accountStore.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6F00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={accountStore.accounts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.accountItem}
            onPress={() => navigation.navigate('EditAccount', { account: toJS(item) })}>
            <View style={styles.itemHeader}>
              <FontAwesome name="user" size={24} color="#FF6F00" style={styles.icon} />
              <Text style={styles.accountName}>{item.name.trim()}</Text>
            </View>
            <Text style={styles.metaInfo}>
              Users: {item.users.length} | Shops: {item.shops.length}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 15 }}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.createButtonText}>+ Create Account</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#F4F6F8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountItem: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 25,
  },
  accountName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  metaInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  createButton: {
    marginTop: 20,
    paddingVertical: 16,
    backgroundColor: '#FF6F00',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#FF6F00',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountManagement;
