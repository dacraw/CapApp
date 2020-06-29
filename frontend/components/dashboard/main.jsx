import React from 'react';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { stocks, user: {ownedStocks} } = this.props;

        if (!stocks || !ownedStocks) return null;
//         debugger
        return (
            <></>
        )
    }
}
export default Dashboard;