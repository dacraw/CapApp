import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/session_actions.js";
import { Link, useLocation, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLines,
  faWindowClose,
  faNewspaper,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fetchStocks } from "../../actions/stock_actions.js";
import StockSearch from "./stock_search.jsx";

const DashNavBar = () => {
  const dispatch = useDispatch();
  const userLogout = () => dispatch(logout());
  const [showMobileNav, setShowMobileNav] = useState(false);

  const currentUser = useSelector((state) => state.session.id);

  const cashAvailable = useSelector(
    (state) => state.entities.portfolios.cashAvailable
  );

  useEffect(() => {
    dispatch(fetchStocks());
  }, []);
  const stocks = useSelector((state) => state.entities.stocks);
  const portfolios = useSelector((state) => state.entities.portfolios);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (!currentUser || !stocks) return null;
  if (!cashAvailable) return null;

  return (
    <>
      <div className="dashboard-nav-container">
        <Link to="/">
          <img className="logo" src={window.logoNoText} />
        </Link>

        <StockSearch stocks={stocks} />

        <div className="dashboard-nav-mobile">
          <div onClick={() => setShowMobileNav(true)}>
            <FontAwesomeIcon icon={faGripLines} />
          </div>
        </div>

        <section className="content">
          <ul className="links">
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
            <li>
              <Link to="/dashboard">Portfolio</Link>
            </li>
            <li className="account-dropdown">
              <a
                onClick={(e) => {
                  e.stopPropagation();
                  $(e.currentTarget).next().fadeToggle(200);
                }}
              >
                Account
              </a>
              <ul className="account-options" id="dash-nav-account-options">
                <li>
                  <div className="summary">
                    {" "}
                    <h3>{currentUser.username}</h3>
                    <div className="double-col">
                      <div>
                        <h4 id="dashboard-nav-pv">
                          {formatter.format(portfolios.portfolioValue)}
                        </h4>
                        <h5>Portfolio Value</h5>
                      </div>
                      <div>
                        <h4>{cashAvailable}</h4>
                        <h5>Cash Available</h5>
                      </div>
                    </div>
                  </div>
                </li>
                <hr />
                <li>
                  <a onClick={userLogout}>
                    <i className="fas fa-sign-out-alt"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
      {showMobileNav && (
        <div className="dash-nav-container-mobile">
          <div className="dash-nav-mobile-content">
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

            <div>
              <FontAwesomeIcon icon={faUserCircle} />
              <Link to="/dashboard">View Your Portfolio</Link>
            </div>

            <div>
              <span>
                Portfolio Value: ${formatter.format(portfolios.portfolioValue)}
              </span>
            </div>
            <div>
              <span>Cash Available: {cashAvailable}</span>
            </div>
            <div>
              <a onClick={userLogout}>
                <i className="fas fa-sign-out-alt"></i>Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashNavBar;
