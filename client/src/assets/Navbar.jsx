import React, { useEffect, useState } from 'react';
import './css/Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import myImg from '../assets/img/user.jpg'
import newRequest from '../utils/newRequest';
import axios from 'axios';
import SearchIcon from './img/searchIcon.jpg'

function Navbar() {
  const [active, setActive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
const [input, setInput] = useState("");

    

    const navigate = useNavigate()

  const { pathname } = useLocation();
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
    
    const handleLogout = async () => {
        try {
            await newRequest.post("auth/logout")
            localStorage.setItem("activeUser", null);
            navigate('/')
        } catch (err) {
            
        }
    }

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

    const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  

  return (
    <>
      <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
        <div className="container">
          <div className="logo">
            <Link className="link" to="/">
              <span className="text">Freelance-Hub</span>
            </Link>
           
          </div>
           <div className="searchContainer">
              <input type="text"  onChange={(e) => setInput(e.target.value)} placeholder='Search...' className='searchBar' />
            <button onClick={handleSubmit}></button>
            </div>
          <div className="links">
            <Link className="link" to="/gigs?category=All">
              Gigs
            </Link>
            <Link className="link" to="/">
              Explore
            </Link>
             <Link className="link" to="/jobs">
              Jobs
            </Link>
              <Link className="link" to="/news">
              News
            </Link>
            {!activeUser && <Link to='/signup'><button className='registerBtn'>Register</button></Link>}
            {activeUser && (
              <div className="user" onClick={() => setShowMenu(!showMenu)}>
                <img src={activeUser.image !== '' ? activeUser.image : myImg} />
                <span>{activeUser?.name}</span>
                {showMenu && (
                  <div className="options">
                    {activeUser?.isSeller && (
                      <>
                        <Link className="link" to="/myGigs">
                          My Gigs
                        </Link>
                      </>
                    )}
                     {!activeUser?.isSeller && (
                      <>
                        <Link className="link" to="/myJobs">
                          My Jobs
                        </Link>
                      </>
                    )}
                    <Link className="link" to="/allChat">
                      All Chat
                    </Link>
                    
                    <Link className="link" to="/orders">
                      Orders
                    </Link>
                    <Link className="link" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {(active || pathname !== '/') && (
          <>
            <hr />
            <div className="menu">
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/">
                Ads Creation
              </Link>
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/">
                Music
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;

