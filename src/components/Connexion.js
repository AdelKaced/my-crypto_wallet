import React, { useState } from 'react';
import Login from './Login';
import Search from './Search';
import SignUp from './SignUp';

const Connexion = () => {
    const [modal, setModal] = useState('')

    const handleConnexion = (e) => {
      console.log(e.target.id);
      setModal(e.target.id)
    }
  return (
    <div className="connexion">
      <div id="Login" onClick={handleConnexion}>Login</div>
      <div id= "SignUp" onClick={handleConnexion}>Sign Up</div>
      {modal === 'Login' && <Login setModal={setModal} /> } 
      {modal === 'SignUp' && <SignUp setModal={setModal} />}
      <Search />
    </div>
  );
};

export default Connexion;
