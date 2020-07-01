import React, {Component} from 'react'

class DashMainSidebarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <>
                <LineChart onMouseMove={this.handleEnter} onMouseLeave={() => this.handleLeave(stock.price)} width={710} height={200} data={data}>
                    <Line isAnimationActive={false} connectNulls={true} type="linear" dataKey={"average"} stroke={strokeColor} dot={false} strokeWidth="2" />
                    <XAxis hide={true} dataKey="label" />
                    <YAxis domain={['auto', 'auto']} hide={true} />
                    <Tooltip wrapperStyle={{left: -30, fontSize: '.8em'}}isAnimationActive={false} filterNull={true} position={{y: -20}} content={<CustomTooltip />} payload={[{ name: "label", value: "average" }]} />
                </LineChart>
            </>
        )
    }
}

export default DashMainSidebarGraph;