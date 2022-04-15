import { useSelector } from 'react-redux';

const NoteItem = ({ note }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h4>
        Nota de {note.isStaff ? <span>Time</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('pt-BR')}
      </div>
    </div>
  );
};

export default NoteItem;
