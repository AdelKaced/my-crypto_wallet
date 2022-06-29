import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../utils/firebase.config';
import Login from './Login';
import Search from './Search';
import SignUp from './SignUp';

const Connexion = () => {
  const [modal, setModal] = useState('');
  const [displayText, setDisplayText] = useState(false);

  const user = useSelector(selectUser);
  console.log(user);

  const handleConnexion = (e) => {
    console.log(e.target.id);
    setModal(e.target.id);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <div>
      {user ? (
        <div className="connexion">
          <div className="name">Welcome {user.displayName}</div>
          <button
            onClick={handleLogout}
            onMouseOver={() => setDisplayText(true)}
            onMouseOut={() => setDisplayText(false)}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
          {displayText && <p className="btn-text">Logout</p>}
          <Search />
        </div>
      ) : (
        <div className="connexion">
          <div id="Login" onClick={handleConnexion}>
            Login
          </div>
          <div id="SignUp" onClick={handleConnexion}>
            Sign Up
          </div>
          {modal === 'Login' && <Login setModal={setModal} />}
          {modal === 'SignUp' && <SignUp setModal={setModal} />}
          <Search />
        </div>
      )}
    </div>
  );
};

export default Connexion;
