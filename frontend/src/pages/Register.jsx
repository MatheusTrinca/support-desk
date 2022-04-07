import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Senhas não conferem');
    }
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Registrar
        </h1>
        <p>Crie sua conta aqui</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Digite seu nome"
              require
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Digite seu email"
              require
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Digite sua senha"
              require
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirme sua senha"
              require
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Cadastrar</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
