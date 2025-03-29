import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>

      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.text}>{section.content}</Text>
        </View>
      ))}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions, contact us at{' '}
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@ezobooks.com')}>
            <Text style={styles.email}>support@ezobooks.com</Text>
          </TouchableOpacity>.
        </Text>
      </View>

      <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
        Go Back
      </Button>
    </ScrollView>
  );
};

// Sections Data
const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using this application, you accept and agree to be bound by these Terms.',
  },
  {
    title: '2. Changes to Terms',
    content: 'We reserve the right to modify these Terms at any time. Your continued use means you accept the changes.',
  },
  {
    title: '3. User Responsibilities',
    content: 'Users must provide accurate information and follow ethical usage guidelines.',
  },
  {
    title: '4. Prohibited Activities',
    content: 'Users are prohibited from engaging in illegal activities, fraud, or unauthorized access.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#444',
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  email: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});

export default TermsAndConditionsScreen;
