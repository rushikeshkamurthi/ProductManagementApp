import React from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import Header from '../../components/Header';
import {LineChart, BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ExternalAdminDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome! Here's a quick overview:</Text>

      {/* Summary Boxes */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>12</Text>
          <Text style={styles.summaryLabel}>Total Shops</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryNumber}>58</Text>
          <Text style={styles.summaryLabel}>Employees</Text>
        </View>
      </View>

      {/* Sales Chart */}
      <Text style={styles.chartTitle}>Monthly Sales</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{data: [500, 700, 800, 600, 1000, 1200]}],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="$"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Stock Chart */}
      <Text style={styles.chartTitle}>Stock Overview</Text>
      <BarChart
        data={{
          labels: ['Shop A', 'Shop B', 'Shop C'],
          datasets: [{data: [300, 500, 250]}],
        }}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 18,
    marginVertical: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    padding: 16,
    width: '45%',
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fff',
  },
  chartTitle: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default ExternalAdminDashboard;
