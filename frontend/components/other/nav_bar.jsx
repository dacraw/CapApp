import React from 'react';
import { NavLink, Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props)
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(e){
        // debugger;
        e.preventDefault();
        document.querySelector('.header-products-dropdown').classList.toggle('show');
    }

    toggleAccountDropdown(e){
        e.preventDefault();
        e.currentTarget.nextSibling.classList.toggle('show');
    }

    render() {
        const { currentUser, logout } = this.props;
        if (currentUser) { 
            return (
                <div className="header-container">
                <section className="header">
                    <img className="logo-notext" src={window.logoNoText} />
                    <input type="search" name="stock-search" id=""/>
                    <ul className="logged-in-nav">
                        <li><Link to="">Free Stocks</Link></li>
                        <li><Link to="">Portfolio</Link></li>
                        <li><Link to="">Cash</Link></li>
                        <li><Link to="">Messages</Link></li>
                        <li className="dashboard-account"><Link onClick={this.toggleAccountDropdown}>Account</Link>
                            <ul className="dashboard-nav-dropdown">
                                <li>
                                    <div className="summary"> {/* TOP PART OF ACCOUNT DROPDOWN */}
                                        <p>{currentUser.username}</p>
                                        <div className="double-col">
                                            <div>
                                                <p>$12.16</p>{/* REPLACE WITH PORTFOLIO VALUE */}
                                                <p>Portfolio Value</p>
                                            </div>
                                            <div>
                                                <p>$10,000</p>{/* REPLACE WITH BUYING POWER */}
                                                <p>Buying Power</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li><Link to="">Free Stock</Link></li>
                                <li><Link to="">Account</Link></li>
                                <li><Link to="">Banking</Link></li>
                                <li><Link to="">History</Link></li>
                                <li><Link to="">Documents</Link></li>
                                <li><Link to="">Settings</Link></li>
                                <li><Link to="">Help Center</Link></li>
                                <li><Link to="">Get Support</Link></li>
                                <li><Link to="">Disclosures</Link></li>
                                <li onClick={logout}>Logout</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
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