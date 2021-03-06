import axios from 'axios';

const fetchNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/tickets/${ticketId}/notes`, config);

  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `/api/tickets/${ticketId}/notes`,
    { text: noteText },
    config
  );

  return response.data;
};

const noteService = {
  fetchNotes,
  createNote,
};

export default noteService;
