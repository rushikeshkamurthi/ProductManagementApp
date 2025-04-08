import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import FontAwesome from 'react-native-vector-icons/FontAwesome';
=======
>>>>>>> 84b0aef52ea93a5d2ce929c1ee647abc87a11511
import Header from '../../components/Header';

const SubAdminDashboard = () => {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <Header title="Sub-Admin Dashboard" />
      <Text style={styles.title}>Welcome, Sub-Admin 👋</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="check-circle" size={30} color="#28a745" />
          <Text style={styles.cardText}>Tasks Completed</Text>
          <Text style={styles.cardNumber}>14</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="hourglass-half" size={30} color="#ffc107" />
          <Text style={styles.cardText}>Pending Tasks</Text>
          <Text style={styles.cardNumber}>3</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="comments" size={30} color="#007bff" />
          <Text style={styles.cardText}>Messages</Text>
          <Text style={styles.cardNumber}>5</Text>
        </View>
=======
      <View style={styles.headerContainer}>
        <Header title="Sub-Admin Dashboard" />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome, Sub-Admin!</Text>
        <Text style={styles.subText}>
          Manage and oversee assigned data efficiently.
        </Text>
>>>>>>> 84b0aef52ea93a5d2ce929c1ee647abc87a11511
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 5,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
    color: '#333',
=======
    backgroundColor: '#f4f6f9', 
  },
  headerContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10, 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, 
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
>>>>>>> 84b0aef52ea93a5d2ce929c1ee647abc87a11511
  },
});

export default SubAdminDashboard;
