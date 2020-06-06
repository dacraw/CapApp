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
    
    render() {
        const { stock } = this.props;
        if (!stock) return null
        return (
            <>
                <p>
                    {this.props.match.params.symbol}
                    {stock.currentPrice}
                    {stock.dayChange}

                </p>
                <ul>
                    {/* {stock.chart.map(point => {
                        <li>${point['close']}</li>
                        })
                    } */}
                </ul>
            </>
        )
    }
}

export default StockShow;