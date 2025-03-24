import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      
      <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing and using this application, you accept and agree to be bound by these Terms.
      </Text>

      <Text style={styles.sectionTitle}>2. Changes to Terms</Text>
      <Text style={styles.text}>
        We reserve the right to modify these Terms at any time. Your continued use means you accept the changes.
      </Text>

      <Text style={styles.sectionTitle}>3. User Responsibilities</Text>
      <Text style={styles.text}>
        Users must provide accurate information and follow ethical usage guidelines.
      </Text>

      <Text style={styles.sectionTitle}>4. Prohibited Activities</Text>
      <Text style={styles.text}>
        Users are prohibited from engaging in illegal activities, fraud, or unauthorized access.
      </Text>

      <Text style={styles.sectionTitle}>5. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions, contact us at support@ezobooks.com.
      </Text>

      <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
        Go Back
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 10 },
  text: { fontSize: 14, marginBottom: 8 },
  button: { marginTop: 20 },
});

export default TermsAndConditionsScreen;
