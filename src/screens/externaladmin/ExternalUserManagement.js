import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import UserManagement from '../UserManagement';
import {useNavigation} from '@react-navigation/native';

const ExternalUserManagement = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="User Dashboard" />
      <Text style={styles.text}></Text>
      <UserManagement navigation={navigation}></UserManagement>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18},
});

export default ExternalUserManagement;
