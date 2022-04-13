import { useState } from 'react';
import { useSelector } from 'react-redux';

const NewTicket = () => {
  const { user } = useSelector(state => state.auth);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
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
