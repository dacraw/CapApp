import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/session_actions.js";

const SplashNavBar = (props) => {
  const sessionId = useSelector((state) => state.session.id);
  const currentUser = useSelector((state) => state.entities.users[sessionId]);
  const dispatch = useDispatch();
  const logoutDispatch = () => dispatch(logout());

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
    <div className="splash-nav-container">
      <section className="splash-nav-main">
        <Link to="/" className="logo"></Link>
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
      </section>
    </div>
  );
};
// class SplashNavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.toggleDropdown = this.toggleDropdown.bind(this);
//   }

//   toggleDropdown(e) {
//     e.preventDefault();
//     document
//       .querySelector(".header-products-dropdown")
//       .classList.toggle("show");
//   }

//   render() {
//     const { currentUser, logout } = this.props;

//     let logoutButton;
//     if (currentUser) {
//       logoutButton = <button onClick={logout}>Logout</button>;
//     }

//     return (
//       <div className="splash-nav-container">
//         <section className="splash-nav-main">
//           <Link to="/" className="logo"></Link>
//           <nav className="splash-nav-links">
//             <li>
//               <a href="https://dacraw.github.io/" target="_blank">
//                 Personal Site
//               </a>
//             </li>
//             <li>
//               <a href="https://github.com/dacraw" target="_blank">
//                 Github
//               </a>
//             </li>
//             <li>
//               <a
//                 href="http://www.linkedin.com/in/doug-a-crawford"
//                 target="_blank"
//               >
//                 LinkedIn
//               </a>
//             </li>
//           </nav>
//           <div className="login-signup">
//             {logoutButton}
//             {!currentUser ? (
//               <>
//                 <Link to="/login">Sign In</Link>
//                 <Link to="/signup">Sign Up</Link>
//               </>
//             ) : (
//               <Link to="/dashboard">Account</Link>
//             )}
//           </div>
//         </section>
//       </div>
//     );
//   }
// }

export default SplashNavBar;
