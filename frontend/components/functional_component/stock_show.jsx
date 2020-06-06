import React, {Component} from 'react'

class StockShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        this.props.fetchStocks()
    }
    
    render() {
        const { stock } = this.props;
        if (!stock) return null
        return (
            <>
                <p>
                    {this.props.match.params.symbol}
                    {this.props.stock.currentPrice}
                </p>
            </>
        )
    }
}

export default StockShow;