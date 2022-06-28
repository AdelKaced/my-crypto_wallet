import React, { useRef } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = ({ setModal }) => {
  const email = useRef();
  const password = useRef();
  const displayName = useRef();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await auth
        .createUserWithEmailAndPassword(
          email.current.value,
          password.current.value
        )
        .then((userAuth) => {
          userAuth.user.updateProfile({
            displayName: displayName.current.value,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal">
      <div className="form-modal">
        <i onClick={() => setModal('')} className="fa-solid fa-xmark"></i>

        <h2>SignUp</h2>
        <p>
          Already have an account ?
          <span onClick={() => setModal('Login')}> Log In</span>
        </p>
        <form onSubmit={handleRegister}>
          <label>Pseudo</label>
          <input
            type="text"
            placeholder="enter your pseudo"
            ref={displayName}
          ></input>
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
          <input type="submit" value="Sign up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
