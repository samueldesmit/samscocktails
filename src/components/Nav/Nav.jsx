import './Nav.scss'
import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";


function Nav() {
  const {isAuthenticated} = useContext(AuthContext);

  const [menu, setMenu] = useState(false);
  function handleMenu() {
    setMenu(!menu);
  }
  function handleMenuClose() {
    setMenu(false);
  }
  let menuClass = menu ? ' navigation__mobile-menu-open' : ' ';
  let menuButtonClass = menu ? ' harburgermenu-open' : ' ';

  return (
    <div className='outer-container'>
    <header className='navigation'>
      <h3 className='navigation__home-logo' onClick={handleMenuClose}><NavLink to="/">Sams Cocktails</NavLink></h3>
      <ul className='navigation__dekstop-menu'>
        <li><NavLink to="/profile">profile</NavLink></li>
        <li><NavLink to="/random">random cocktail</NavLink></li>  
        {isAuthenticated &&  <li><NavLink to="/favorites">favorites</NavLink></li>  }
      </ul>
      <div className={`harburgermenu${menuButtonClass}`} onClick={handleMenu}>
        <span className='harburgermenu__burger burger'></span>
        <span className='harburgermenu__burger burger'></span>
        <span className='harburgermenu__burger burger'></span>
      </div>
      <div className={`navigation__mobile-menu${menuClass}`}>
        <ul className='mobile-navigation-list'>
          <li onClick={handleMenu}><NavLink to="/profile">profile</NavLink></li>
          <li onClick={handleMenu}><NavLink to="/random">random cocktail</NavLink></li>
          {isAuthenticated &&   <li onClick={handleMenu}><NavLink to="/favorites">favorites</NavLink></li>}
        </ul>
      </div>
    </header>
    </div>
  )
}

export default Nav