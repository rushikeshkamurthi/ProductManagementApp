// store/orderStore.js
import {makeAutoObservable, runInAction} from 'mobx';
import * as orderApi from '../api/orderApi';

class OrderStore {
  orders = [];
  currentOrder = null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async placeOrder(cartItems) {
    this.loading = true;
    this.error = null;
    try {
      const response = await orderApi.placeOrder(cartItems);
      runInAction(() => {
        this.currentOrder = response;
        this.orders.push(response); // optionally cache new order
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || 'Failed to place order.';
        this.loading = false;
      });
    }
  }

  async fetchUserOrders() {
    this.loading = true;
    this.error = null;
    try {
      const orders = await orderApi.getUserOrders();
      runInAction(() => {
        this.orders = orders;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || 'Failed to fetch orders.';
        this.loading = false;
      });
    }
  }

  async fetchOrderById(orderId) {
    this.loading = true;
    this.error = null;
    try {
      const order = await orderApi.getOrderById(orderId);
      runInAction(() => {
        this.currentOrder = order;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || 'Failed to fetch order.';
        this.loading = false;
      });
    }
  }

  async fetchShopOrders(shopId) {
    this.loading = true;
    this.error = null;
    try {
      const orders = await orderApi.getShopOrders(shopId);
      runInAction(() => {
        this.orders = orders;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message || 'Failed to fetch shop orders.';
        this.loading = false;
      });
    }
  }
}

const orderStore = new OrderStore();
export default orderStore;
