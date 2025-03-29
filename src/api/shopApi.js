import apiClient from '../utils/apiClient';

const ShopApi = {
  getShops: async () => {
    return apiClient.get('/shops');
  },

  getShopById: async id => {
    return apiClient.get(`/shops/${id}`);
  },

  createShop: async shopData => {
    return apiClient.post('/shops', shopData);
  },

  updateShop: async (id, shopData) => {
    return apiClient.put(`/shops/${id}`, shopData);
  },

  deleteShop: async id => {
    return apiClient.patch(`/shops/${id}/soft-delete`);
  },
};

export default ShopApi;
