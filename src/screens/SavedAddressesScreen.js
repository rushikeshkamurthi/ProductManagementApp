import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const savedAddresses = [
  {id: 1, label: 'Home', address: '123 Street, City, Country'},
  {id: 2, label: 'Work', address: '456 Avenue, City, Country'},
];

const SavedAddressesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Addresses</Text>
      <FlatList
        data={savedAddresses}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.label}</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 22, fontWeight: 'bold'},
  card: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  label: {fontSize: 18, fontWeight: 'bold'},
});

export default SavedAddressesScreen;
