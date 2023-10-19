import './NavSign.css';
import { Link } from 'react-router-dom';

const NavSign = () => {
  return (
    <nav className="navsign">
      <ul className="navsign__list">
        <li>
          <Link to="/sign-up" className="navsign__link navsign__link_type_signup">
            Регистрация
          </Link>
        </li>
        <li>
          <Link to="/sign-in" className="navsign__link navsign__link_type_signin">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavSign;
