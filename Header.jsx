import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, setIsLoggedIn, isSignedUp }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="header-container">
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link to="/" style={{ color: "white" }}>
            <img
              style={{ width: "200px", height: "20px", marginRight: "800px", borderColor: "none" }}
              alt="UMC Movie"
            />
          </Link>
          <ul>
            <li>
              {isLoggedIn ? (
                <button className="header-nav-item" style={{ color: "yellow" }} onClick={handleLogout}>
                  로그아웃
                </button>
              ) : isSignedUp ? (
                <Link className="header-nav-item" to="/loginPage" style={{ color: "yellow" }}>
                  로그인
                </Link>
              ) : (
                <Link className="header-nav-item" to="/validation" style={{ color: "yellow" }}>
                  회원가입
                </Link>
              )}
            </li>
            <li>
              <Link className='header-nav-item' to="/PopularPage">
                Popular
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to="/NowPlayingPage">
                Now Playing
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to="/TopRatedPage">
                Top Rated
              </Link>
            </li>
            <li>
              <Link className='header-nav-item' to="/UpComing">
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
