import {makeAutoObservable} from 'mobx';
import {getAllUsers, createUser, updateUser, deleteUser} from '../api/userApi';

class UserStore {
  users = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.loading = true;
    try {
      const response = await getAllUsers();
      this.users = response.data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async addUser(userData) {
    try {
      const response = await createUser(userData);
      this.fetchUsers();
    } catch (error) {
      this.error = error.message;
    }
  }

  async editUser(id, userData) {
    try {
      await updateUser(id, userData);
      this.fetchUsers(); // Refresh the list
    } catch (error) {
      this.error = error.message;
    }
  }

  async removeUser(id) {
    try {
      await deleteUser(id);
      this.users = this.users.filter(user => user.id !== id);
    } catch (error) {
      this.error = error.message;
    }
  }
}

export default new UserStore();
