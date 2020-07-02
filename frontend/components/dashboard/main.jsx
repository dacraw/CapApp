import React from 'react';
import NewsComponent from '../other/NewsComponent'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { stocks, user: {ownedStocks} } = this.props;



        if (!stocks || !ownedStocks) return null;
        return (
            <>
                <NewsComponent />
            </>
        )
    }
}
export default Dashboard;