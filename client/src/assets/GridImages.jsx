import React from 'react'
import grd1 from '../assets/img/grdIMG1.jpg';
import grd2 from '../assets/img/grdIMG2.jpg';
import grd3 from '../assets/img/grdIMG3.jpg';
import grd4 from '../assets/img/grdIMG4.jpg';
import grd5 from '../assets/img/grdIMG5.jpg';
import bg4 from './img/fdbck.jpg'
import './css/GridImages.scss'

function GridImages() {
  return (
    <div className='GridImages'>
      <div className="feedback">
        <div className="feedback-image">
          <img className='img1' src={bg4} alt="" />
        </div>
        <div className="feedback-content">
          <span>"As a freelancer, finding the right platform to showcase my skills and connect with clients has always been crucial. I've tried several platforms in the past, but none have compared to the experience I've had with Freelance-Hub.
From the moment I signed up, I was impressed by the user-friendly interface and the abundance of opportunities available."</span>
        </div>
      </div>
    </div>
  )
}

export default GridImages
