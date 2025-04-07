import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import {LineChart, BarChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ShopDetailsScreen = ({route}) => {
  const {shop} = route.params;

  // Dummy data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{data: [5000, 7000, 6000, 8000, 7500]}],
  };

  const stockData = {
    labels: ['Rice', 'Oil', 'Soap', 'Sugar'],
    datasets: [{data: [100, 60, 120, 90]}],
  };

  return (
    <ScrollView style={styles.container}>
      <Header title={`${shop.name} Details`} />

      <Text style={styles.sectionTitle}>📈 Monthly Sales</Text>
      <LineChart
        data={salesData}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="₹"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>📦 Stock Levels</Text>
      <BarChart
        data={stockData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        yAxisLabel=""
        yAxisSuffix=" units"
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>📊 Profit & Loss Overview</Text>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{data: [2000, 3000, -1500, 2500]}],
        }}
        width={screenWidth - 32}
        height={220}
        yAxisSuffix="₹"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>🏪 Shop Information</Text>
      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Shop ID:</Text>
        <Text>{shop.id}</Text>

        <Text style={styles.infoLabel}>Account ID:</Text>
        <Text>{shop.accountId}</Text>

        <Text style={styles.infoLabel}>Created At:</Text>
        <Text>{new Date(shop.createdAt).toLocaleString()}</Text>

        <Text style={styles.infoLabel}>Address:</Text>
        <Text>123, Main Market Street, Cityville</Text>

        <Text style={styles.infoLabel}>Employees Working:</Text>
        <Text>12</Text>

        <Text style={styles.infoLabel}>Inventory Items:</Text>
        <Text>56</Text>
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 8,
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#FFF7EE',
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default ShopDetailsScreen;
