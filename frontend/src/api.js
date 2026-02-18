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
  return await api.post('tickets/', ticketData);
};

export const getTickets = async (params) => {
  return await api.get('tickets/', { params });
};

export const updateTicket = async (id, data) => {
  return await api.patch(`tickets/${id}/`, data);
};

export const getStats = async () => {
  return await api.get('tickets/stats/');
};

export default api;
