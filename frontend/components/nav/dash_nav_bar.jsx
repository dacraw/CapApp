import React from 'react';
import {Link} from 'react-router-dom'

class DashNavBar extends React.Component{
    constructor(props){
        super(props)
    }
    
    toggleAccountDropdown(e){
        e.stopPropagation();
        e.currentTarget.nextSibling.classList.toggle('show');
    }

    componentDidMount(){
        window.onclick = function(e){
            document.getElementById('dash-nav-account-options').classList.remove('show');
        }
    }

    render(){
        
        const { currentUser, logout, cashAvailable } = this.props;
        if (!currentUser) return null
        if (!cashAvailable) return null
        return (
            <div className="dashboard-nav-container">
                <section className="content">
                    <Link to="/"><img className="logo-notext" src={window.logoNoText} /></Link>
                    <div className="search-wrapper">
                        <input className="search" placeholder="Search" type="search" name="stock-search" id=""/>
                        <i className="fas fa-search"></i>
                    </div>
                    <ul className="links">
                        <li><a>Free Stocks</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>Cash</a></li>
                        <li><a>Messages</a></li>
                        <li className="account-dropdown"><a onClick={this.toggleAccountDropdown}>Account</a>
                            <ul className="account-options" id="dash-nav-account-options">
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
                                <li><a><i className="fas fa-gift"></i>Free Stock</a></li>
                                <li><a><i className="fas fa-suitcase"></i>Account</a></li>
                                <li><a><i className="fas fa-university"></i>Banking</a></li>
                                <li><a><i className="fas fa-history"></i>History</a></li>
                                <li><a><i className="fas fa-file-alt"></i>Documents</a></li>
                                <li><a><i className="fas fa-cog"></i>Settings</a></li>
                                <hr />
                                <li><a><i className="fas fa-question"></i>Help Center</a></li>
                                <li><a><i className="fas fa-info-circle"></i>Get Support</a></li>
                                <li><a><i className="fas fa-bars"></i>Disclosures</a></li>
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