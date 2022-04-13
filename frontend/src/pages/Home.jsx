import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="heading">
        <h1>Como podemos te ajudar?</h1>
        <p>Escolha uma opção abaixo</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Criar novo chamado
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt /> Ver meus chamados
      </Link>
    </>
  );
};

export default Home;
