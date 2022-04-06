import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Entrar
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Cadastrar
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
