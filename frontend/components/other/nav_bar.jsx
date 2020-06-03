import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(e){
        
        e.preventDefault();
        document.querySelector('.header-products-dropdown').classList.toggle('show');
    }

    render() {
        const { currentUser, logout } = this.props;
        if (currentUser) { 
            return (
                <nav className="header-nav">
                        <h2>Logged In</h2>
                        <p>{currentUser.username}</p>
                        <button onClick={logout}>logout</button>
                </nav>
            )
        } else { 
            return (
                <div className="header-container">
                    <section className="header">
                        <img className="logo" src={window.logo} />
                        <nav className="splash-header-nav">
                            <li className="header-products">
                                <a onClick={this.toggleDropdown}>Products &#9660;</a>
                            </li>
                            <li><Link to='/learn'>Learn</Link></li>
                            <li><Link to='/support'>Support</Link></li>
                        </nav>
                        <div className="header-logged-options">
                            <Link to="/login">Sign In</Link>
                            <Link to="signup">Sign Up</Link>
                        </div>
                    </section>
                    <ul className="header-products-dropdown">
                                    <li><Link to='/stocks-funds'>Stocks & Funds</Link></li>
                                    <li><Link to='/options'>Options</Link></li>
                                    <li><Link to='/gold'>Gold</Link></li>
                                    <li><Link to='/cash-management'>Cash Management</Link></li>
                                    <li><Link to='/crypto'>Crypto</Link></li>
                    </ul>
                </div>
            )
        }
    }
};

export default NavBar