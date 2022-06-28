import React, { useRef } from 'react';
import { auth } from '../utils/firebase.config';

const Login = ({ setModal }) => {
  const email = useRef();
  const password = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth
        .signInWithEmailAndPassword(email.current.value, password.current.value)
        .then(console.log('Connected'));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal">
      <div className="form-modal">
        <i onClick={() => setModal('')} className="fa-solid fa-xmark"></i>

        <h2>Login</h2>
        <p>
          New on crypto wallet ?{' '}
          <span onClick={() => setModal('SignUp')}>Create a account</span>
        </p>
        <form onSubmit={handleLogin}>
          <label>Email adress</label>
          <input
            type="text"
            placeholder="enter your email adress"
            ref={email}
          ></input>
          <label>Password</label>
          <input
            type="password"
            placeholder="enter your password"
            ref={password}
          ></input>
          <input type="submit" value="Log in" />
        </form>

        <p>Forgot your password ? you are in the merde haha</p>
      </div>
    </div>
  );
};

export default Login;
