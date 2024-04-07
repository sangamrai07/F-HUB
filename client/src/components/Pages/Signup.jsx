import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signup.scss";
import "../../utils/upload.js";
import "../../utils/newRequest.js";
import upload from "../../utils/upload.js";
import newRequest from "../../utils/newRequest.js";

function Signup() {
  const [file, setFile] = useState(null);
  const [portfolioImgs, setPortfolioImgs] = useState([]);
  

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
    isSeller: false,
    description: "",
  });
  
  const [isEmailAlreadyRegistered, setIsEmailAlreadyRegistered] = useState(false);
  const [userNameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

    const handlePortfolioImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPortfolioImgs(files);
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user.username || !user.email || !user.password) {
    alert("Please fill out all required fields.");
    return;
  }


   const url = file ? await upload(file) : "";
   
     let portfolioImgUrls = [];
  
  for (const imgFile of portfolioImgs) {
    const imgUrl = imgFile ? await upload(imgFile) : "";
    portfolioImgUrls.push(imgUrl);
  }

  try {
    const res = await newRequest.post("/auth/register", {
      ...user,
      image: url,
      portfolioImg: portfolioImgUrls
    });
    // localStorage.setItem("activeUser", JSON.stringify(res.data)); // Set activeUser in localStorage
    const userID = res.data._id;
    navigate(`/verificationToken/${userID}`);

  } catch (err) {
    if (err.response && err.response.status === 409) {
      setIsEmailAlreadyRegistered(true);
      console.log(err);
    }
    else if (err.response && err.response.status === 410) {
      setUsernameTaken(true);
      console.log(err);
    }
    else {
      console.log(err);
      alert("An error occurred. Please try again later.");
    }
  }
};

  return (
<div className="signup">
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username: </label>
          <input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
            value={user.username}
            required
            />
             {userNameTaken && (
            <p className="error-message">Username already taken.</p>
          )}
          <label htmlFor="">Email: </label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
            value={user.email}
            required
          />
          {isEmailAlreadyRegistered && (
            <p className="error-message">Email already registered</p>
          )}
          <label htmlFor="">Password: </label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            value={user.password}
            required
          />
          <label htmlFor="">Profile Picture: </label>
          <input
              type="file"
               name="image"
            onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="">Highlight Images: </label>
          <input
              type="file"
              name="portfolioImg"
        accept="image/*"
        multiple
        onChange={handlePortfolioImageChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>Become a Seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input
                type="checkbox"
                onChange={handleSeller}
                checked={user.isSeller}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="description"
            cols="23"
            rows="12"
            onChange={handleChange}
            value={user.description}
            ></textarea>
            <p> Have an Account?<Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Signup;




