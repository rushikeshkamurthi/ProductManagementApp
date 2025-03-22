import {makeAutoObservable, runInAction} from 'mobx';
import productApi from '../api/productApi';

class ProductStore {
  products = [];
  selectedProduct = null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    runInAction(() => {
      this.loading = true;
      this.error = null; // Reset error before fetching
    });

    try {
      const response = await productApi.getProducts();
      console.log('response.data;', response.data);

      runInAction(() => {
        this.products = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async fetchProductById(id) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      const response = await productApi.getProductById(id);
      runInAction(() => {
        this.selectedProduct = response.data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async createProduct(data) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      await productApi.createProduct(data);
      await this.fetchProducts(); // Refresh product list
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async updateProduct(id, data) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      await productApi.updateProduct(id, data);
      await this.fetchProducts();
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async deleteProduct(id) {
    runInAction(() => {
      this.loading = true;
      this.error = null;
    });

    try {
      await productApi.deleteProduct(id);
      runInAction(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export default new ProductStore();
