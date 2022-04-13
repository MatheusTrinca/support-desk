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

const ticketService = {
  createTicket,
  fetchTickets,
};

export default ticketService;
