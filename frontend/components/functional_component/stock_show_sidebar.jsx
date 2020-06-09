import React, {Component} from 'react'

class StockShowSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_shares: 0.00,
            symbol: "",
            user_id: 0,
            stock_price: "",
            formType: 'buy',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount() {
        // this.props.fetchStocks()
        
        window.onclick = function(e){
            document.getElementById('sidebar-info-dropdown').classList.remove('show');
        }

        // set user_id to currentuser for form submission
        this.setState({user_id: this.props.currentUser, symbol: this.props.match.params.symbol})
        
    }

    componentDidUpdate(prevProps) {
        // if user changes hash locations, update the symbol
        // 2nd part of conditional only updates the state's symbol to the given symbol if it's present in the stock list
        
        if (this.props.match.params.symbol !== prevProps.match.params.symbol && !!this.props.stocks[this.props.match.params.symbol.toUpperCase()]){
            
            this.setState({symbol: this.props.match.params.symbol.toUpperCase()}) 
        }
        
    }

    handleInput(field){
        return e => (
            this.setState({
                [field]: e.currentTarget.value,
                stock_price: this.props.stock.chart[this.props.stock.chart.length-1].close,
            })
        )
    }

    handleSubmit(e){
        e.preventDefault();

        // if user doenst own the stock, then create it
        debugger
        if (!this.props.userInfo.ownedStocks[this.state.symbol.toUpperCase()]) {
            this.props.createPortfolio(this.state);
        } else {
            // otherwise, update it
            this.props.updatePortfolio(this.state)
        }
    }

    setFormType(type){
        // debugger
        return e => {
            // set formType when user clicks buy or sell in the sidebar
            // also hide or show cash available or num shares accordingly
            this.setState({formType: type})
            if (type === 'sell') {
                $('.buying-power').removeClass('show').addClass('hide');
                $('.num-shares').removeClass('hide').addClass('show')
            } else if (type === 'buy') {
                $('.num-shares').removeClass('show').addClass('hide');
                $('.buying-power').removeClass('hide').addClass('show')
            }
        }
    }

    showBox(e){
        e.stopPropagation();
        
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    
    render() {
        const { userInfo, stock } = this.props;
        
        // this requires stock.chart for pricing, so return null if it isnt established yet
        if (!stock || !stock.chart || !userInfo) return null;
        let estimatedPrice = (this.state.num_shares == 0) ? stock.chart[stock.chart.length-1].close : stock.chart[stock.chart.length-1].close * this.state.num_shares;
        
        // NUMSHARES check if user owns shares before displaying num_shares
        let numShares = 0;
        if (!!userInfo.ownedStocks[this.props.match.params.symbol.toUpperCase()]){
            numShares = userInfo.ownedStocks[this.props.match.params.symbol.toUpperCase()]['num_shares'] 
        } 
   
        return (
            <>
                <ul className="buy-sell">
                    <li onClick={() => this.setFormType('buy')} className="selected">Buy {stock.symbol}</li>
                    <li onClick={() => this.setFormType('sell')} className={(numShares > 0) ? "show" : "hide"}>Sell {stock.symbol}</li>
                </ul>
                <hr />
                <section onSubmit={this.handleSubmit}>
                    <form className="pst-form">
                        <section className="line">
                            {/* <i class="fas fa-arrows-alt-v"></i> */}
                            <label>Invest In</label>
                            <select defaultValue="Dollars">
                                {/* <option>Shares</option> */}
                                <option>Dollars</option>
                            </select>
                        </section>
                        <section className="line">
                            <label>Shares</label>
                            <input type="number" placeholder="0" onChange={this.handleInput('num_shares')} value={this.state.num_shares} />
                        </section>
                        <section className="line">
                            <label>Market Price</label>
                            <data className="cost-credit">{stock.chart[stock.chart.length-1].close}</data>
                        </section>
                        <hr />
                        <section className="line cost-credit">
                            <label>Estimated cost</label>
                            <data>{estimatedPrice} </data>
                        </section>
                        <button>Review Order</button>
                    </form>
                </section>
                <hr />
                <section className="buying-power bottom show">
                        <a onClick={this.showBox}>{userInfo.cashAvailable} available for trading. </a>
                        <div className="info-box" id="sidebar-info-dropdown">
                            <h3>Good luck!</h3>
                            <div className="line">
                                <p>Vestibulum convallis ut nulla non tincidunt.  </p>
                                <p>Praesent congue sed neque in sagittis.  </p>
                            </div>  
                            <div className="line">
                                <p>Praesent in efficitur massa, at feugiat lectus.  </p>
                                <p>Proin imperdiet, felis nec tristique tempor </p>
                            </div>  
                        </div>
                        <i className="fas fa-question-circle"></i>
                </section>
                <section className="num-shares bottom hide">
                    {numShares} shares available for trading.
                </section>
            </>
        )
    }
}

export default StockShowSidebar;