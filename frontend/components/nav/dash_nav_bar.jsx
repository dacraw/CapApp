import React from 'react';
import {Link} from 'react-router-dom'

class DashNavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchValue: "",
        }
        this.filterResults = this.filterResults.bind(this);
        this.enterSearchList = this.enterSearchList.bind(this);
    }
    
    toggleAccountDropdown(e){
        e.stopPropagation();
        $(e.currentTarget).next().fadeToggle(200);
    }

    componentDidUpdate(prevProps){
        
        if (this.props.location.pathname !== prevProps.location.pathname){ 
            this.setState({searchValue: ""})
            $('#stock-list ul:first-child').fadeOut(100);
        }
    }

    enterSearchList(e){
       
        e.preventDefault();

        if (!e.currentTarget.value) return null;
        
        switch (e.keyCode) {
            case 40:
                if (!$('#stock-list .selected').length) {
                    $('#stock-list ul li:visible a')[0].classList.add('selected')
                } else {
                    // move to next sibling
                    $(e.currentTarget).next().find('.selected').parent().nextAll('li:visible').first().find('a').addClass('selected')
                    // remove selected from current item
                    e.currentTarget.nextSibling.querySelectorAll('.selected')[0].classList.remove('selected');
                }
                break;
            case 38:
                // only use up arrow if a list item is selected
                if ($('#stock-list .selected').length && $('#stock-list li:visible').length > 1){
                    // move to next sibling
                    $(e.currentTarget).next().find('.selected').parent().prevAll('li:visible').first().find('a').addClass('selected')
                    // remove selected from current item
                    $(e.currentTarget).next().find('.selected').last().removeClass('selected');
                }

                break;
            case 13:
                // // press enter to visit link

                // only use enter if a stock is selected
                if ($('#stock-list .selected').length){
                    $('#stock-list .selected')[0].click();
                    // remove focus from search bar when user presses enter
                    document.activeElement.blur();
                    $('#stock-list .selected')[0].classList.remove('selected');
                    $('#stock-list li').hide();
                }
                break;
            default:
                // hide any selected list items
                $('#stock-list ul li a.selected').removeClass('selected');
                break;
        }
    }
    
    filterResults(e){
        debugger
        e.preventDefault();
        const props = this.props; 
        $('.category').show();
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
            
            if (a){
                const info = a.getElementsByTagName('span');
                const symbol = info[0].textContent;
                const company = info[1].textContent;
                if (symbol.includes(currentValue.toUpperCase()) || company.includes(currentValue[0].toUpperCase() + currentValue.slice(1))){
                    li[i].style.display = "block";
                    debugger
                    // change has this ternary for when it's on the stock show page, or dashboard page. for the search results
                    const change = (props.match.params.symbol) ? (props.stocks[props.match.params.symbol.toUpperCase()]).dollarChange : "";
                    const color = (change <= 0) ? "negative-change" : "";

                    li[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML = symbol.replace(new RegExp(currentValue.toUpperCase(), "gi"), (match) => `<strong class="highlight ${color}">${match}</strong>`);
                    li[i].getElementsByTagName('a')[0].getElementsByTagName('span')[1].innerHTML = company.replace(new RegExp(currentValue[0].toUpperCase() + currentValue.slice(1), "gi"), (match) => `<strong class="highlight ${color}">${match}</strong>`);
                    
                } else {
                    li[i].style.display = "none";
                }
            } 
        }
        
        if (!$('#stock-list ul li:visible a').length){
            $('.category').hide();
            $('.stock-list ul').append('<li class="no-results">No results match.</li>')
        }
    }
    
    render(){
        
        const { currentUser, logout, cashAvailable, stocks } = this.props;
        if (!currentUser || !stocks) return null
        if (!cashAvailable) return null
         
        $('#stock-list .selected').keypress( e => console.log(e));
        
        return (
            <div className="dashboard-nav-container">
                <section className="content">
                    <Link to="/"><img className="logo-notext" src={window.logoNoText} /></Link>
                    <div className="search-wrapper"  >
                        <input id="stock-search" onChange={this.filterResults} onKeyUp={this.enterSearchList} value={this.state.searchValue} className="search" placeholder="Search" type="text" autoComplete="off" name="stock-search" id=""/>

                        <section className="stock-list" id="stock-list">
                            <ul onKeyDown={this.navigateResults}>
                                <li className="category">Stocks</li>
                                {Object.values(stocks).map( (stock, idx) => <li key={idx}><Link to={`/stocks/${(stock.symbol) ? stock.symbol.toLowerCase() : ""}`}><span className="symbol">{stock.symbol}</span><span className="company">{stock.company}</span></Link></li>)}
                            </ul>    
                        </section>

                        <i className="fas fa-search"></i>
                    </div>
                    <ul className="links">
                        {/* <li><a>Free Stocks</a></li> */}
                        <li><Link to="/dashboard">Portfolio</Link></li>
                        {/* <li><a>Cash</a></li> */}
                        {/* <li><a>Messages</a></li> */}
                        <li className="account-dropdown"><a onClick={this.toggleAccountDropdown}>Account</a>
                            <ul className="account-options" id="dash-nav-account-options">
                                <li>
                                    <div className="summary"> {/* TOP PART OF ACCOUNT DROPDOWN */}
                                        <h3>{currentUser.username}</h3>
                                        <div className="double-col">
                                            <div>
                                                <h4>{currentUser.portfolioValue}</h4>{/* REPLACE WITH PORTFOLIO VALUE */}
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
                                {/* <li><a><i className="fas fa-gift"></i>Free Stock</a></li>
                                <li><a><i className="fas fa-suitcase"></i>Account</a></li>
                                <li><a><i className="fas fa-university"></i>Banking</a></li>
                                <li><a><i className="fas fa-history"></i>History</a></li>
                                <li><a><i className="fas fa-file-alt"></i>Documents</a></li>
                                <li><a><i className="fas fa-cog"></i>Settings</a></li>
                                <hr />
                                <li><a><i className="fas fa-question"></i>Help Center</a></li>
                                <li><a><i className="fas fa-info-circle"></i>Get Support</a></li>
                                <li><a><i className="fas fa-bars"></i>Disclosures</a></li> */}
                                {/* <hr /> */}
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