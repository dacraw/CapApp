import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class SplashNavBar extends React.Component {
    constructor(props){
        super(props)
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(e){
        // debugger;
        e.preventDefault();
        document.querySelector('.header-products-dropdown').classList.toggle('show');
    }



    render() {
        const { currentUser, logout } = this.props;

        let logoutButton;
        if (currentUser) { logoutButton = <button onClick={logout}>Logout</button> }

        return (
            <div className="splash-nav-container">
                <section className="splash-nav-main">
                    <img className="logo" src={window.logo} />
                    <nav className="splash-nav-links">
                        <li><a href='/personal_site' target="_blank">Personal Site</a></li>
                        <li><a href='https://github.com/dacrawford89' target="_blank">Github</a></li>
                        <li><a href='http://www.linkedin.com/in/doug-a-crawford' target="_blank">LinkedIn</a></li>
                    </nav>
                    <div className="login-signup">
                        {logoutButton}
                        <Link to="/login">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </section>
            </div>
        )
    }
};

export default SplashNavBar