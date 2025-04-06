import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import RNPrint from 'react-native-print';

const ReceiptScreen = ({route, navigation}) => {
  const {orderData} = route.params;

  const handlePrint = async () => {
    const htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            size: 58mm auto;
            margin: 0;
          }
          body {
            width: 58mm;
            font-family: monospace;
            font-size: 10px;
            margin: 0;
            padding: 5px;
            color: #000;
          }
          .center {
            text-align: center;
          }
          .bold {
            font-weight: bold;
          }
          .line {
            border-top: 1px dashed #000;
            margin: 6px 0;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
          }
          .left {
            flex: 1;
          }
          .right {
            text-align: right;
            min-width: 60px;
          }
        </style>
      </head>
      <body>
        <div class="center bold">🧾 STORE NAME</div>
        <div class="center">123 Street, City</div>
        <div class="center">GSTIN: 1234567890</div>

        <div class="line"></div>

        <div><strong>Order ID:</strong> ${orderData.orderId}</div>
        <div><strong>Date:</strong> ${new Date().toLocaleString()}</div>

        <div class="line"></div>

        <div class="bold">Items</div>
        ${orderData.items
          .map(
            item => `
              <div class="item-row">
                <div class="left">#${item.productId} x${item.quantity}</div>
                <div class="right">₹${
                  item.quantity * item.priceAtOrderTime
                }</div>
              </div>
            `,
          )
          .join('')}

        <div class="line"></div>
        <div class="item-row bold">
          <div class="left">TOTAL</div>
          <div class="right">₹${orderData.totalPrice}</div>
        </div>

        <div class="line"></div>
        <div class="center">🙏 Thank you!</div>
        <div class="center">Visit Again</div>
      </body>
    </html>
  `;

    try {
      await RNPrint.print({html: htmlContent});
    } catch (error) {
      Alert.alert('Error', 'Failed to print receipt. Please try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✅ Order Successful!</Text>
      <Text style={styles.orderId}>Order ID: {orderData.orderId}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePrint}>
        <Text style={styles.buttonText}>🖨️ Print or Save PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {fontSize: 22, fontWeight: 'bold', marginBottom: 20},
  orderId: {fontSize: 16, marginBottom: 30},
  button: {
    padding: 15,
    backgroundColor: '#EC5228',
    borderRadius: 10,
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default ReceiptScreen;
