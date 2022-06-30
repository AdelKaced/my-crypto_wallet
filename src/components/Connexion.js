import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../utils/firebase.config';
import Login from './Login';
import Search from './Search';
import SignUp from './SignUp';

const Connexion = () => {
  const [modal, setModal] = useState('');
  const [displayText, setDisplayText] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const handleConnexion = (e) => {
    console.log(e.target.id);
    setModal(e.target.id);
  };

  const handleLogout = async () => {
    setModal('');
    setDisplayText(false)
    await signOut(auth).then(()=> dispatch(logout()))
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
