import apiClient from '../utils/apiClient';

const productApi = {
  getProducts: async () => {
    return await apiClient.get('/products');
  },

  getProductById: async id => {
    return await apiClient.get(`/products/${id}`);
  },

  createProduct: async data => {
    return await apiClient.post('/products', data);
  },

  updateProduct: async (id, data) => {
    return await apiClient.put(`/products/${id}`, data);
  },

  deleteProduct: async id => {
    return await apiClient.delete(`/products/${id}`);
  },
};

export default productApi;
