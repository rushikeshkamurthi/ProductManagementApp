import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HelpSupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text>📞 Customer Support: +1 234 567 890</Text>
      <Text>📧 Email: support@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 22, fontWeight: 'bold', marginBottom: 10},
});

export default HelpSupportScreen;
