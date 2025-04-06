// api/orderApi.js
import apiClient from '../utils/apiClient';

export const placeOrder = async cartItems => {
  const response = await apiClient.post('/orders', {cartItems});
  return response.data;
};

export const getUserOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data.orders;
};

export const getOrderById = async orderId => {
  const response = await apiClient.get(`/orders/${orderId}`);
  return response.data.order;
};

export const getShopOrders = async shopId => {
  const response = await apiClient.get(`/shops/${shopId}/orders`);
  return response.data.orders;
};
