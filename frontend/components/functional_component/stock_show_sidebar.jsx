import React, {Component} from 'react'

class StockShowSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_shares: 0,
            stock_id: "",
            user_id: window.currentUser.id,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate() {
        
    }
    
    componentDidMount() {
        // this.props.fetchStocks()
        // debugger
        window.onclick = function(e){
            document.getElementById('sidebar-info-dropdown').classList.remove('show');
        }
    }

    componentDidUpdate() {
        // this.props.fetchStock(this.props.match.params.symbol)
    }

    handleInput(field){
        return e => (
            this.setState({[field]: e.currentTarget.value})
        )
    }

    handleSubmit(e){
        e.preventDefault();
//         debugger
        this.setState({stock_id: this.props.stock.id})
        this.props.submit(this.state);
    }

    showBox(e){
        e.stopPropagation();
        // debugger
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    
    render() {
        const { cashAvailable, stock } = this.props;
        // debugger
        // this requires stock.chart for pricing, so return null if it isnt established yet
        if (!stock || !stock.chart) return null;
        return (
            <>
                <ul className="buy-sell">
                    <li className="selected">Buy {stock.symbol}</li>
                    <li>Sell {stock.symbol}</li>
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
                            <data>{stock.chart[stock.chart.length-1].close}</data>
                        </section>
                        <button>Review Order</button>
                    </form>
                </section>
                <hr />
                <section className="buying-power">
                        <a onClick={this.showBox}>{cashAvailable} available for trading. </a>
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
            </>
        )
    }
}

export default StockShowSidebar;