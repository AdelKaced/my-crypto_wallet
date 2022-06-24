import React from 'react';

const Login = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="form-modal">
        <i onClick={() => setModal('')} className="fa-solid fa-xmark"></i>

        <h2>Login</h2>
        <p>
          New on crypto wallet ?{' '}
          <span onClick={() => setModal('SignUp')}>Create a account</span>
        </p>
        <form>
          <label>Email adress</label>
          <input type="text" placeholder="enter your email adress"></input>
          <label>Password</label>
          <input type="password" placeholder="enter your password"></input>
          <input type="submit" value="Log in" />
        </form>

        <p>Forgot your password ? you are in the merde haha</p>
      </div>
    </div>
  );
};

export default Login;
