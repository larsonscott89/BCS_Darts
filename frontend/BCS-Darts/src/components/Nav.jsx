import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../styles/Nav.css';

export default function Nav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className='navbar'>
      <Link to='#' className='menu-bars'>
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              <AiIcons.AiOutlineClose />
            </Link>
            <Link to='/' className='nav-text'>
              Home
            </Link>
            <Link to='/leagues' className='nav-text'>
              Leagues
            </Link>
            <Link to='/teams' className='nav-text'>
              Teams
            </Link>
            <Link to='/teamsignups' className='nav-text'>
              Team Sign-Ups
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}