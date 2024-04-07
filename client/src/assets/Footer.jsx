import React from 'react'
import './css/Footer.scss'
import Fblogo from "../assets/img/fb.png"
import YTlogo from "../assets/img/Yt.logo.jpg"
import LKlogo from "../assets/img/LkdInlogo.png"
import Instalogo from "../assets/img/InsLogo.jpg"
import Twtlogo from "../assets/img/twitter.png"
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
        <div className="imgContainer">
          <img src={Fblogo} alt="F" />
          <img src={YTlogo} alt="F" />
          <img src={ LKlogo} alt="F" />
          <img src={Instalogo} alt="F" />
          <img src={Twtlogo} alt="F" />
        </div>
        <div className="textContainer">
          <div className="textItem">
            <h3>SERVICES</h3>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
          </div>
          <div className="textItem">
               <h3>COMMUNITY</h3>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
        </div>
          <div className="textItem">
               <h3>CONTACT US</h3>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
          </div>
          <div className="textItem">
             <h3>COMPANY</h3>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
            <h5>Content 1</h5>
          </div>
          <div className="textItem">
            <h3>Join Our Community</h3>
            <Link to="/login"><button>Join Us</button></Link>
          </div>
      </div>
      <div className="copyRight">
        <h4>Terms of Use | Privacy Policy | Trademarks | License Agreements</h4>
        <h5>Copyright &#169; 2016. All Rights Reserved</h5> 
      </div>
    </div>
  )
}

export default Footer


