import apiClient from '../utils/apiClient';

export const getCompanies = async () => {
  const response = await apiClient.get('/companies');
  return response.data;
};

export const getCompanyById = async id => {
  const response = await apiClient.get(`/companies/${id}`);
  return response.data;
};

export const createCompany = async data => {
  const response = await apiClient.post('/companies', data);
  return response.data;
};

export const updateCompany = async (id, data) => {
  const response = await apiClient.put(`/companies/${id}`, data);
  return response.data;
};

export const deleteCompany = async id => {
  const response = await apiClient.delete(`/companies/${id}`);
  return response.data;
};
