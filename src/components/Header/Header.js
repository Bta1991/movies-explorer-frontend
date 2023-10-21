import './Header.css';
import { useLocation } from 'react-router-dom';
import Logo from './Logo/Logo';
import NavSign from './NavSign/NavSign';
import NavBar from './NavBar/NavBar';

const Header = ({ isLoggedIn }) => {
  const path = useLocation().pathname;

  const classLocal = path === '/' ? 'header_type_landing'
  : path === "/movies" || path === "/saved-movies" || path === '/profile'
  ? '' : 'header_hidden';

  return (
    <header className={"header " + classLocal}>
      <div className="container">
        <div className="header__container">
          <Logo />
          {!isLoggedIn ? <NavSign /> : <NavBar path={path} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
