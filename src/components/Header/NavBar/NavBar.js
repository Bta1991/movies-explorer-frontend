import { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = ({ path }) => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  function onClickBurger() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  function onClose() {
    setIsBurgerOpened(false);
  }

  function handleCloseByOverlay(e) {
    if (e.target.classList.contains('navbar_state_opened')) {
      onClose();
    }
  }

  const generateClassName = (current) => {
    return `navbar__link ${path === current ? 'navbar__link_active' : ''}`;
  }

  return (
    <div className="navbar">
      <button
        className={`navbar__burger ${isBurgerOpened ? 'navbar__burger_closed' : ''}`}
        type='button'
        onClick={onClickBurger}
      />

      <nav className={`navbar__container navbar_state_${isBurgerOpened ? 'opened' : 'closed'}`} onClick={handleCloseByOverlay}>
        <ul className="navbar__list">
          <li className='navbar__item navbar__item_type_mobile'>
            <NavLink to='/' className={generateClassName('/')}  onClick={onClose}>
              Главная
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/movies" className={generateClassName('/movies')} onClick={onClose}>
              Фильмы
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/saved-movies" className={generateClassName('/saved-movies')} onClick={onClose}>
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/profile" className={generateClassName('/profile') + ' navbar__link_type_account'} onClick={onClose}>
              Аккаунт
              <div className={`navbar__link-icon ${path === '/' ? 'navbar__link-icon_landing' : ''}`} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
