import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { reset, getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { reset as notesReset, getNotes } from '../features/notes/noteSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';

const Ticket = () => {
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
