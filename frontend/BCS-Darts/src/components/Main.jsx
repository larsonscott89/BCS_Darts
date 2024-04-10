import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useEffect
import Header from './Header';
import Home from './Home';
import Leagues from './Leagues';
import Teams from './Teams';
import Signup from './Signup';
import Players from './Players';
import Scoresheet from './Scoresheet';
import UserLogIn from './UserLogIn';
import UserSignUp from './UserSignUp';
import Users from './Users'; 
import AdminPromotion from './AdminPromotion'


export default function Main() {
  const [leagues, setLeagues] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');


  const isAuthenticated = () => {
    return loggedIn;
  };

  const isAdmin = () => {
    return userRole === 'admin';
  };

  return (
    <div>
      <div>
      <Header
        setLeagues={setLeagues}
        loggedIn={loggedIn}
        username={username}
        setLoggedIn={setLoggedIn}
        setUserRole={setUserRole}
        userRole={userRole}
        />
      </div>
      <Routes>
        <Route path='/' element={<Home loggedIn={loggedIn} />} />
        <Route path="/login" element={<UserLogIn setLoggedIn={setLoggedIn} setUsername={setUsername} setUserId={setUserId} setUserRole={setUserRole} />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path='/leagues' element={<Leagues />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/teamsignups' element={<Signup />} />
        <Route path='/players' element={<Players />} />
        <Route path='/Scoresheets' element={<Scoresheet />} />

        <Route path='/admin' element={isAuthenticated() && isAdmin() ? <AdminPromotion /> : <Navigate to="/admin" />} />
        <Route path='/user' element={isAuthenticated() && isAdmin() ? <Users /> : <Navigate to="/user" />} />
        <Route path='/admin/promotions' element={isAuthenticated() && isAdmin() ? <AdminPromotion /> : <Navigate to="/admin" />} />
      </Routes>
    </div>
  );
}