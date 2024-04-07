import React, { useState, useEffect } from 'react';
import './css/Content.scss';
import bg1 from './img/Bg1.png';
import bg2 from './img/BG2.png';
import bg3 from './img/bg3.png';
import bg4 from './img/bg6.png';

function Content() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const images = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content-container">
      <div className="row">
        <div className="col-2">
          <h1>
            Connect, Create, <span>Succeed!</span>
            <br />
            Your Freelance Journey Starts Here.
          </h1>
          <p>
            Experience freelance freedom like never before, with our platform connecting you to projects that match your
            expertise and passion. Join a dynamic community of freelancers and clients, where collaboration thrives, and
            every project is an opportunity for growth.
          </p>
          <a href="" className="btn">
            Explore More &#8594;
          </a>
        </div>
        <div className="col-2">
          {images.map((image, index) => (
            <img
              key={index}
              className={`bg-image ${index === currentBgIndex ? 'active' : ''}`}
              style={{ zIndex: index === currentBgIndex ? 1 : 0 }} // Ensure the active image is on top
              src={image}
              alt={`Background Image ${index}`}
            />
          ))}
        </div>
      </div>
   
    </div>
  );
}

export default Content;

