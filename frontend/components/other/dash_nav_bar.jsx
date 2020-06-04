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

    componentDidMount(){
        this.props.fetchPortfolio(state.session.id)
    }

    render(){
        if (!currentUser) return null
        if (!cashAvailable) return null
        const { currentUser, logout, cashAvailable } = this.props;
        return (
            <div className="dashboard-nav-container">
                <section className="content">
                    <img className="logo-notext" src={window.logoNoText} />
                    <div className="search-wrapper">
                        <input className="search" placeholder="Search" type="search" name="stock-search" id=""/>
                        <i className="fas fa-search"></i>
                    </div>
                    <ul className="links">
                        <li><Link>Free Stocks</Link></li>
                        <li><Link>Portfolio</Link></li>
                        <li><Link>Cash</Link></li>
                        <li><Link>Messages</Link></li>
                        <li className="account-dropdown"><Link onClick={this.toggleAccountDropdown}>Account</Link>
                            <ul className="account-options">
                                <li>
                                    <div className="summary"> {/* TOP PART OF ACCOUNT DROPDOWN */}
                                        <h3>{currentUser.username}</h3>
                                        <div className="double-col">
                                            <div>
                                                <h4>$12.16</h4>{/* REPLACE WITH PORTFOLIO VALUE */}
                                                <h5>Portfolio Value</h5>
                                            </div>
                                            <div>
                                                <h4>{cashAvailable}</h4>{/* REPLACE WITH BUYING POWER */}
                                                <h5>Buying Power</h5>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <hr />
                                <li><Link><i className="fas fa-gift"></i>Free Stock</Link></li>
                                <li><Link><i className="fas fa-suitcase"></i>Account</Link></li>
                                <li><Link><i className="fas fa-university"></i>Banking</Link></li>
                                <li><Link><i className="fas fa-history"></i>History</Link></li>
                                <li><Link><i className="fas fa-file-alt"></i>Documents</Link></li>
                                <li><Link><i className="fas fa-cog"></i>Settings</Link></li>
                                <hr />
                                <li><Link><i className="fas fa-question"></i>Help Center</Link></li>
                                <li><Link><i className="fas fa-info-circle"></i>Get Support</Link></li>
                                <li><Link><i className="fas fa-bars"></i>Disclosures</Link></li>
                                <hr />
                                <li><a onClick={logout}><i className="fas fa-sign-out-alt"></i>Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
        )
    }
} 
   
export default DashNavBar;