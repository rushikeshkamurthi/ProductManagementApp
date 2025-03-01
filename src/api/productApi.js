import apiClient from '../utils/apiClient';

export const fetchProducts = shopId =>
  apiClient.get(`/shops/${shopId}/products`);
