import React, {Component} from 'react'
import GraphPointComponent from './graph_point_component'

class GraphComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        const { chart } = this.props;
        if (!chart) return null;
        return (
            <section className="graph">
                <ul>
                    {chart.map( (point, idx) => <GraphPointComponent key={idx} point={point} />)}
                </ul>
            </section>
        )
    }
}

export default GraphComponent;