import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faWindowClose,
  faNewspaper,
} from "@fortawesome/free-regular-svg-icons";
import {
  faGripLines,
  faDoorClosed,
  faArrowCircleRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const SplashNavBar = (props) => {
  const sessionId = useSelector((state) => state.session.id);
  const currentUser = useSelector((state) => state.entities.users[sessionId]);
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logout());
  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    document
      .querySelector(".header-products-dropdown")
      .classList.toggle("show");
  };

  let logoutButton;
  if (currentUser) {
    logoutButton = <button onClick={logoutDispatch}>Logout</button>;
  }

  return (
    <>
      <div className="splash-nav-container">
        <section className="splash-nav-main">
          <div className="splash-nav-mobile-hamburger">
            <Link to="/">
              <img className="logo" src={window.logo} />
            </Link>
            <div onClick={() => setShowMobileNav(true)}>
              <FontAwesomeIcon icon={faGripLines} />
            </div>
          </div>
          <div className="splash-nav-content">
            <Link to="/">
              <img className="logo" src={window.logo} />
            </Link>
            <nav className="splash-nav-links">
              <li>
                <a href="https://dacraw.github.io/" target="_blank">
                  Personal Site
                </a>
              </li>
              <li>
                <a href="https://github.com/dacraw" target="_blank">
                  Github
                </a>
              </li>
              <li>
                <a
                  href="http://www.linkedin.com/in/doug-a-crawford"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
            </nav>
            <div className="login-signup">
              {logoutButton}
              {!currentUser ? (
                <>
                  <Link to="/login">Sign In</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <Link to="/dashboard">Account</Link>
              )}
            </div>
          </div>
        </section>
      </div>
      {showMobileNav && (
        <div className="splash-nav-container-mobile">
          <div className="splash-nav-mobile-content">
            <FontAwesomeIcon
              onClick={() => setShowMobileNav(false)}
              className="close-mobile-nav"
              icon={faWindowClose}
            />
            <div>
              <FontAwesomeIcon icon={faNewspaper} />
              <a href="https://dacraw.github.io/" target="_blank">
                Personal Site
              </a>
            </div>
            <div>
              <img src={window.githubLogo} />
              <a href="https://github.com/dacraw" target="_blank">
                Github
              </a>
            </div>

            <div>
              <img src={window.linkedinLogo} />
              <a
                href="http://www.linkedin.com/in/doug-a-crawford"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>

            {!currentUser ? (
              <>
                <div>
                  <FontAwesomeIcon icon={faArrowCircleRight} />
                  <Link to="/login">Sign In</Link>
                </div>
                <div>
                  <FontAwesomeIcon icon={faArrowUp} />
                  <Link to="/signup">Sign Up</Link>
                </div>
              </>
            ) : (
              <div>
                <FontAwesomeIcon icon={faUserCircle} />
                <Link to="/dashboard">View Your Portfolio</Link>
              </div>
            )}

            <div>
              {currentUser && (
                <>
                  <FontAwesomeIcon icon={faDoorClosed} />
                  <p onClick={logoutDispatch}>Logout</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SplashNavBar;
