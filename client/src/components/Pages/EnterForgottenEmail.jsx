import React, { useState } from 'react';
import '../Css/ForgottenEmail.scss';
import newRequest from '../../utils/newRequest';

function EnterForgottenEmail() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Clear error message on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post('/auth/forgetPassword', { email });
       if (res.status === 210) {
        setErrorMessage('Next token will be sent after 30 mins.');
      } else {
        alert('Reset Link Sent to the email.');
      }
      
    } catch (err) {
      if (err.response.status === 404) {
        setErrorMessage('This email is not registered!');
      } 
    }
  };

  return (
    <div className='forgottenEmail'>
      <header>
        <h1>Forgot Password ?</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage &&
<p style={{ marginTop: '2px', marginBottom: '10px', color: 'red', fontFamily: 'Arial, sans-serif' }}>{errorMessage}</p>
}
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default EnterForgottenEmail;


