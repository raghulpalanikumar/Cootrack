import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Backend URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const classifyTicket = async (description) => {
  try {
    const response = await api.post('tickets/classify/', { description });
    return response.data;
  } catch (error) {
    console.error('Error classifying ticket:', error);
    return null;
  }
};

export const createTicket = async (ticketData) => {
  const response = await api.post('tickets/', ticketData);
  return response.data;
};

export const getTickets = async (params) => {
  const response = await api.get('tickets/', { params });
  return response.data;
};

export const updateTicket = async (id, data) => {
  const response = await api.patch(`tickets/${id}/`, data);
  return response.data; // Ensure this returns data, though update might not use it directly
};

export const getStats = async () => {
  const response = await api.get('tickets/stats/');
  return response.data;
};

export default api;
