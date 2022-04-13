import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, createTicket } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const NewTicket = () => {
  const { user } = useSelector(state => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset);
      navigate('/tickets');
    }
    dispatch(reset());
  }, [isError, message, isSuccess, navigate, dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Criar Novo Chamado</h1>
        <p>Complete todos os campos abaixo</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Nome do Cliente</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email do Cliente</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Nome do Produto</label>
            <select
              name="product"
              id="product"
              onChange={e => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição do Problema</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              onChange={e => setDescription(e.target.value)}
              placeholder="Descreva o problema..."
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
