import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    padding: 15,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1, 
    borderColor: "blue",
    flex: 1,
    margin: 5,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  transactionList: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default styles;
