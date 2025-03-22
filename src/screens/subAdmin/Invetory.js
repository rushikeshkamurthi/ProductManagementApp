import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

const Invetory = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="User Dashboard" />
      <Text style={styles.text}>Browse Invetory and shops.</Text>
      <Button
        title="View all Products"
        onPress={() => navigation.navigate('ProductList')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default Invetory;
