import {makeAutoObservable} from 'mobx';
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from '../api/accountApi';

class AccountStore {
  accounts = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchAccounts() {
    this.loading = true;
    try {
      const response = await getAccounts();

      this.accounts = response;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async addAccount(accountData) {
    try {
      const response = await createAccount(accountData);
      this.fetchAccounts();
    } catch (error) {
      this.error = error.message;
    }
  }

  async editAccount(id, accountData) {
    try {
      await updateAccount(id, accountData);
      this.fetchAccounts(); // Refresh the list
    } catch (error) {
      this.error = error.message;
    }
  }

  async removeAccount(id) {
    try {
      await deleteAccount(id);
      this.accounts = this.accounts.filter(account => account.id !== id);
    } catch (error) {
      this.error = error.message;
    }
  }
}

export default new AccountStore();
