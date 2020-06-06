import React, {Component} from 'react'

class StockShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
       this.props.fetchStock(this.props.params.match.symbol)
    }
    
    render() {
        const { stock } = this.props;
        if (!stock) return null
        return (
            <>
                <p>
                    {this.props.match.params.symbol}
                    {this.props.stock.currentPrice}
                    {this.props.stock.dayChange}
                </p>
            </>
        )
    }
}

export default StockShow;