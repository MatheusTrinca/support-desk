import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { reset, getTicket, closeTicket } from '../features/tickets/ticketSlice';
import {
  reset as notesReset,
  getNotes,
  addNote,
} from '../features/notes/noteSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
};

Modal.setAppElement('#root');

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    state => state.notes
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));

    return () => {
      if (isSuccess) {
        dispatch(reset());
        dispatch(notesReset());
      }
    };
  }, [isError, isSuccess, message, dispatch, ticketId]);

  const onCloseTicket = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Chamado Encerrado');
    navigate('/tickets');
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onSubmitNote = e => {
    e.preventDefault();
    dispatch(addNote({ noteText, ticketId }));
    closeModal();
  };

  if (isLoading || notesIsLoading) return <Spinner />;

  if (isError) return <h1>Algo deu Errado!!</h1>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          ID da Chamada: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Data: {new Date(ticket.createdAt).toLocaleString('pr-BR')}</h3>
        <h3>Produto: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Descricão do Problema</h3>
          <p>{ticket.description}</p>
        </div>
        <h3>Notas</h3>
      </header>

      {ticket.status !== 'closed' && (
        <button className="btn" onClick={openModal}>
          <FaPlus /> Adicionar Nota
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Add Nota"
      >
        <h2>Adicionar Nota</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onSubmitNote}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Descrição da Nota"
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </Modal>

      {notes && notes.map(note => <NoteItem key={note._id} note={note} />)}

      {ticket.status !== 'closed' && (
        <button onClick={onCloseTicket} className="btn btn-block btn-danger">
          Encerrar Chamado
        </button>
      )}
    </div>
  );
};

export default Ticket;
