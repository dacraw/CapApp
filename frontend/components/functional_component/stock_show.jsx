import React, {Component} from 'react'
import GraphComponent from './graph_component'
import AboutComponent from './graph_component'

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

    componentDidUpdate(prevProps, prevState){
        // debugger
        // check if the hash has changed; if so, fetch single stock info UNLESS already in the state
        // currently only fetching 1d graph
        if (this.props.match.params.symbol !== prevProps.match.params.symbol && !this.props.stocks[this.props.match.params.symbol.toUpperCase()].chart ){
            this.props.fetchStock(this.props.match.params.symbol)
        }
    }
    
    render() {
        const { stock } = this.props;
        debugger
        if (!stock) return null
        if (!stock.chart) return null;
        return (
            <main className="stock-show-container">
                <p>
                    {this.props.match.params.symbol}
                </p>
                <GraphComponent chart={stock.chart} />
                <AboutComponent about={stock.about} />

            </main>

        )
    }
}

export default StockShow;