import create from 'zustand';

export const useAccountStore = create(set => ({
  accounts: [],
  fetchAccounts: async () => {
    const response = await axios.get('/accounts');
    set({accounts: response.data});
  },
}));
