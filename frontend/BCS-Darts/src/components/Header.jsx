import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav'

export default function Header({ loggedIn, username, handleSignOut, userRole }) {
  return (
    <div className='header'>
      <Nav userRole={userRole}/>
      <div className="top-right-buttons">
        {loggedIn ? (
          <div className={'user-signed-in'}>
            <button className={'signout-button'} type="button" onClick={handleSignOut}>Sign Out</button>
            <span className={'welcome-message'}>Welcome, {username}</span>
          </div>
        ) : (
          <Link to="/signup">
            <img
              style={{ width: '65px', height: '40px'}}
              src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
              alt="login_img"
            />
          </Link>
        )}
      </div>
    </div>
  );
}