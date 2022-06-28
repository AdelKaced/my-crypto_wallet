import { signOut } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { CoinsContext } from '../App';
import { auth } from '../utils/firebase.config';
import Login from './Login';
import Search from './Search';
import SignUp from './SignUp';

const Connexion = () => {
  const [modal, setModal] = useState('');
  const user = useContext(CoinsContext).user;
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
          <button onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
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
