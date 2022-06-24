import React from 'react';

const SignUp = ({ setModal }) => {
  return (
    <div className="modal">
      <div className="form-modal">
        <i onClick={() => setModal('')} className="fa-solid fa-xmark"></i>

        <h2>Sign Up</h2>
        <p>
          Already have an account ? 
          <span onClick={() => setModal('Login')}> Log In</span>
        </p>
        <form>
          <label>Pseudo</label>
          <input type="text" placeholder="enter your pseudo"></input>
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

export default SignUp;
