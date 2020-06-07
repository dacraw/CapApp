import React, {Component} from 'react'

class StockShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        // debugger
       this.props.fetchStock(this.props.match.params.symbol)
    }

    shouldComponentUpdate(nextProps, nextState){
        debugger
        if (this.props.stock){
            return this.props.match.params.symbol !== this.props.stock.symbol
        }
    }
    
    render() {
        const { stock } = this.props;
        debugger
        if (!stock) return null
        return (
            <>
                <p>
                    {this.props.match.params.symbol}
                    {stock.currentPrice}
                    {stock.dayChange}

                </p>
                <ul>
                    
                </ul>
            </>
        )
    }
}

export default StockShow;