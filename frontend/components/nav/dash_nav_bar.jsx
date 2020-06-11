import React from 'react';
import {Link} from 'react-router-dom'

class DashNavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
        }
        this.filterResults = this.filterResults.bind(this);
    }
    
    toggleAccountDropdown(e){
        e.stopPropagation();
        e.currentTarget.nextSibling.classList.toggle('show');
    }

    componentDidUpdate(prevProps){
        if (this.props.location.pathname !== prevProps.location.pathname){ 
            this.setState({searchValue: ""})
            $('#stock-list ul').hide();
        }
    }

    filterResults(e){
        e.preventDefault();

        
        document.querySelectorAll('.stock-list ul li').forEach ( (item, idx) => {
            if (item.textContent === 'No results match.'){
                      item.parentNode.removeChild(item)
            }
        })
       
        this.setState({ searchValue: e.currentTarget.value});

        let stockList = document.getElementById('stock-list');

        if (!e.currentTarget.value){
            stockList.firstChild.style.display = "none"
        } else {
            stockList.firstChild.style.display = "block"
        }
        
        let currentValue = e.currentTarget.value;

        let li = stockList.getElementsByTagName('li');
        
        for (let i = 0; i < li.length; i++){
            let a = li[i].getElementsByTagName('a')[0];
            // make sure a has a value to avoid console errors
            debugger
            if (a){
                const info = a.getElementsByTagName('span');
                const symbol = info[0].textContent;
                const company = info[1].textContent;
                if (symbol.includes(currentValue.toUpperCase()) || company.includes(currentValue[0].toUpperCase() + currentValue.slice(1))){
                    li[i].style.display = "block";
                } else {
                    li[i].style.display = "none";
                }
            } 
        }
        // debugger
        if (!$('#stock-list ul li:visible').length){
            $('.stock-list ul').append('<li>No results match.</li>')
        }
    }

    render(){
        
        const { currentUser, logout, cashAvailable, stocks } = this.props;
        if (!currentUser) return null
        if (!cashAvailable) return null
        return (
            <div className="dashboard-nav-container">
                <section className="content">
                    <Link to="/"><img className="logo-notext" src={window.logoNoText} /></Link>
                    <div className="search-wrapper">
                        <input id="stock-search" onChange={this.filterResults} value={this.state.searchValue} className="search" placeholder="Search" type="text" autoComplete="off" name="stock-search" id=""/>

                        <section className="stock-list" id="stock-list">
                            <ul>
                                {Object.values(stocks).map( (stock, idx) => <li key={idx}><Link to={`/stocks/${stock.symbol.toLowerCase()}`}><span className="symbol">{stock.symbol}</span><span className="company">{stock.company}</span></Link></li>)}
                            </ul>    
                        </section>

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