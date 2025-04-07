import React, {useContext} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../context/AuthContext';
import {LineChart, PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const {user} = useContext(AuthContext);

  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [1200, 1500, 1000, 2000, 1800, 2200],
        strokeWidth: 2,
      },
    ],
  };

  const pieChartData = [
    {
      name: 'Grocery',
      population: 40,
      color: '#FF6F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Beverages',
      population: 20,
      color: '#007bff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Snacks',
      population: 25,
      color: '#28a745',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Others',
      population: 15,
      color: '#6f42c1',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user?.name || 'User'} 👋</Text>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <FontAwesome name="users" size={30} color="#FF6F00" />
          <Text style={styles.cardText}>Total Accounts</Text>
          <Text style={styles.cardNumber}>12</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="shopping-cart" size={30} color="#007bff" />
          <Text style={styles.cardText}>Total Shops</Text>
          <Text style={styles.cardNumber}>8</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome name="archive" size={30} color="#28a745" />
          <Text style={styles.cardText}>Total Products</Text>
          <Text style={styles.cardNumber}>50</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>📈 Weekly Sales</Text>
      <LineChart
        data={lineChartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.sectionTitle}>🛒 Product Category Breakdown</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  propsForDots: {
    r: '4',
    strokeWidth: '1',
    stroke: '#FF6F00',
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#444',
  },
  chart: {
    borderRadius: 8,
    marginBottom: 20,
  },
});

export default DashboardScreen;
