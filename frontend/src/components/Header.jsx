import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        {user ? (
          <button onClick={onLogout} className="btn">
            <FaSignOutAlt /> Sair
          </button>
        ) : (
          <>
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
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
