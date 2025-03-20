import {useState, useEffect} from 'react';
import ShopApi from '../api/shopApi';

export const useShopStore = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const response = await ShopApi.getShops();
      console.log('fetchShops response', response);

      setShops(response.data.shops);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return {shops, loading, error, fetchShops};
};
