import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

const paymentMethods = [
  {id: 1, type: 'Credit Card', details: '**** 5678'},
  {id: 2, type: 'UPI', details: 'user@upi'},
];

const MyPaymentMethodsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Methods</Text>
      <FlatList
        data={paymentMethods}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.type}</Text>
            <Text>{item.details}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
  card: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  label: {fontSize: 18, fontWeight: 'bold'},
});

export default MyPaymentMethodsScreen;
