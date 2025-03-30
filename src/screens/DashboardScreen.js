import React from 'react';
<<<<<<< Updated upstream
import {View, Text} from 'react-native';
=======
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../ScreenStyleSheet/DashboardStyle';
>>>>>>> Stashed changes

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
     
      <ScrollView style={styles.content}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <TouchableOpacity style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Reports</Text>
            <Text style={styles.cardValue}>Check Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Sale (TDY)</Text>
            <Text style={styles.cardValue}>₹ 0</Text>
          </TouchableOpacity>
        </View>

       

        {/* License Expired Alert */}
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>LICENSE: EXPIRED</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy BillGeniy</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionList}>
          <Text>No Transactions Available</Text>
        </View>
      </ScrollView>

   
    </View>
  );
};

export default DashboardScreen;
