import React, { useState } from 'react';
import '../Css/VerificationToken.scss';
import { useNavigate, useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

function VerificationToken() {

  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState('');
  

  const handleChange = (e) => {
      setVerificationCode(e.target.value);
      console.log(verificationCode)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
          const res = await newRequest.post('auth/verifyEmail', { userID: id, verificationCode: verificationCode })
        console.log(res)
        localStorage.setItem("activeUser", JSON.stringify(res.data)); // Set activeUser in localStorage
        navigate('/')
        
           if (res.status === 206) {
        alert("Invalid User ID.")
           }
      }
      catch (err) {
          console.log(err)
           if (err.response.status === 410 ) {
        alert("User not found.")
           }
          if (err.response.status === 401 ) {
        alert("ID does not match.")
           }
      }
  };

  return (
    <div className="verificationToken">
      <header>
        <h1>Verify Your Email</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="verification-code">Verification Code:</label>
          <input
            type="text"
            id="verification-code"
            onChange={handleChange}
            required
                  />
        </div>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

export default VerificationToken;

