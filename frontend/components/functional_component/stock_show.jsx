import React, {Component} from 'react'

class StockShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        this.props.fetchStock(this.props.match.params.symbol)
    }
    
    render() {
        const { stock } = this.props;
        if (!stock) return null
        return (
            <>
                <p>
                    
                </p>
            </>
        )
    }
}

export default StockShow;