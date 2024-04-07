import React, { useEffect, useState } from 'react';
import '../Css/ForgetPassword.scss';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

function ForgetPasswordPage() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState('');
  
  const [invalidToken, setInvalidToken] = useState('');
  const [busy, setBusy] = useState(true);
  const [success, setSuccess] = useState();

  const location = useLocation();
  const { token, id } = queryString.parse(location.search);
  
  const verifyToken = async () => {
    try {
      
      const { data } = await axios.get(`http://localhost:3001/server/auth/validateToken?token=${token}&id=${id}`);
      setBusy(false);
    } catch (err) {
      if (err?.response?.data) {
        const { data } = err.response;
        if (!data.success) {
          console.log("Error from backend:", err.response.data); 
      
        setInvalidToken(err.response.data);
        }
      }
      console.log("Error Occurred: ",err);
      setInvalidToken('An error occurred while verifying token.');
      setBusy(false); 
    }
  };
  const handleChange = ({ target }) => {
    const { name, value } = target
    setNewPassword({...newPassword, [name]: value})
}

const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const { password, confirmPassword } = newPassword;

    if (password.trim().length < 8 || password.trim().length > 12) {
        alert('Password must be 8-12 characters long.');
        return; // Prevent further execution
    } else if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Prevent further execution
    }

    try {
        setBusy(true);
        const { data } = await axios.post(`http://localhost:3001/server/auth/resetForgottenPassword?token=${token}&id=${id}`, { password });
        setBusy(false)
            setSuccess(true);
        
    } catch (err) {
        if (err.response.status === 401) {
        setErrorMessage("New password must be different.")
        }
        else {
          setInvalidToken('An error occurred while verifying token.');
      }
        console.log("Error Occurred: ", err);  
        setBusy(false);
    }
};


  useEffect(() => {
    verifyToken();
  }, []);


   if (success) {
  return (
    <>
      <h3 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginTop: '40px', marginBottom: '40px' }}>Password Reset Successfull.</h3>
    </>
  );
}
  
  if (invalidToken) {
  return (
    <>
      <h3 style={{ textAlign: 'center', fontSize: '24px', color: '#333',marginTop: '40px', marginBottom: '40px' }}>{invalidToken}</h3>
    </>
  );
}


  if (busy) 
    return (<h3 style={{ textAlign: 'center', fontSize: '24px', color: '#333', marginTop: '40px', marginBottom: '40px' }}>Verifying Token ...</h3>)// Added return statement
  

  return (
    <div className="forgot-password-page">
      <header>
        <h1>Forgot Password</h1>
      </header>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            name="password"
            type="password"
            placeholder='Enter New Password'
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-email">Confirm Email:</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder='Confirm New Password'
            onChange={handleChange}
            required
          />
        </div>
           {errorMessage &&
<p style={{ marginTop: '2px', marginBottom: '10px', color: 'red', fontFamily: 'Arial, sans-serif' }}>{errorMessage}</p>
}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgetPasswordPage;

