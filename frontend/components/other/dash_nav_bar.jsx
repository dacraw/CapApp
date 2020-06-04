import React from 'react';
import {Link} from 'react-router-dom'

class DashNavBar extends React.Component{
    constructor(props){
        super(props)
    }
    toggleAccountDropdown(e){
        e.preventDefault();
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    render(){
        const { logout } = this.props;
        return (
            <div className="dashboard-nav-container">
                <section className="content">
                    <img className="logo-notext" src={window.logoNoText} />
                    <input type="search" name="stock-search" id=""/>
                    <ul className="links">
                        <li><Link>Free Stocks</Link></li>
                        <li><Link>Portfolio</Link></li>
                        <li><Link>Cash</Link></li>
                        <li><Link>Messages</Link></li>
                        <li className="account-dropdown"><Link onClick={this.toggleAccountDropdown}>Account</Link>
                            <ul className="account-options">
                                <li>
                                    <div className="summary"> {/* TOP PART OF ACCOUNT DROPDOWN */}
                                        <p>{window.currentUser.username}</p>
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
                                <li><Link>Free Stock</Link></li>
                                <li><Link>Account</Link></li>
                                <li><Link>Banking</Link></li>
                                <li><Link>History</Link></li>
                                <li><Link>Documents</Link></li>
                                <li><Link>Settings</Link></li>
                                <li><Link>Help Center</Link></li>
                                <li><Link>Get Support</Link></li>
                                <li><Link>Disclosures</Link></li>
                                <li onClick={logout}>Logout</li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
        )
    }
} 
   
export default DashNavBar;