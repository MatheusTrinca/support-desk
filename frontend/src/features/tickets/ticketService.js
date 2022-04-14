import axios from 'axios';

// Create Ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post('/api/tickets', ticketData, config);

  return response.data;
};

// Get All Tickets
const fetchTickets = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get('/api/tickets', config);

  return response.data;
};

// Get Ticket
const fetchTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/tickets/${ticketId}`, config);

  return response.data;
};

// Close Ticket
const updateTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `/api/tickets/${ticketId}`,
    {
      status: 'closed',
    },
    config
  );

  return response.data;
};

const ticketService = {
  createTicket,
  fetchTickets,
  fetchTicket,
  updateTicket,
};

export default ticketService;
