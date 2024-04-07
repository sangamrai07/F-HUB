import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Css/DemoLogin.scss'
import loginBG from '../../assets/loginImg.jpg'



function DemoLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setFormError({ ...formError, username: '' });
    setLoginError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormError({ ...formError, password: '' });
    setLoginError('');
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!username) {
    setFormError({ ...formError, username: 'Username is required!!' });
    return;
  }
  if (!password) {
    setFormError({ ...formError, password: 'Password is required!!' });
    return;
  }
  try {
    const res = await axios.post("http://localhost:3001/server/auth/login", {
      username,
      password,
    }, { withCredentials: true });
    localStorage.setItem("activeUser", JSON.stringify(res.data));
    navigate("/");
  } catch (err) {
    if (err.response && err.response.status === 400) {
      setLoginError("Incorrect password. Please Try Again");
    } else {
      setLoginError("Username doesn't exist.");
      console.error(err);
    }
  }
 };
  

  return (
    <>
      <div className="login">
              <div className="container">
                  <div className="formContainer">
                      
                      <form onSubmit={handleSubmit}>
                          <h2>Login to Your Account</h2>
                          <label htmlFor="username">Username</label>
                          <input type="text" name='username' value={username}
                              onChange={handleUsernameChange} placeholder='Enter your username...' />
                                        {formError.username && <p className="error-message">{formError.username}</p>}
                          <label htmlFor="Password">Password</label>
                          <input type="password" name='password' value={password}
                onChange={handlePasswordChange} placeholder='Enter your password...' />
                {formError.password && <p className="error-message">{formError.password}</p>}
                          <span className='forget' onClick={() => navigate('/forgottenEmail')}>Forgot Password?</span>
                        
                          {loginError && <p className="error-message">{loginError}</p>}
                          <button type='submit' className='loginBtn'>Login</button>
                          <h3>OR</h3>
                      <span className='signIn'>Don't have an Account? <span className='SigninLink'> <Link className='link' to='/Signup'>Sign In</Link></span></span>                       
            </form>                      
                  </div>
                  <div className="imgContainer">
                      <img src={loginBG} alt="" />
                  </div>       
        </div>
      </div>
    </>
  );
}

export default DemoLogin;