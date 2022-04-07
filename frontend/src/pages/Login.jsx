import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Entrar
        </h1>
        <p>Entre para usar o Support Desk</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button className="btn btn-block">Entrar</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
