import React from 'react'

export default ({ point }) => {
    
    return (
        <li className="graph-point" price={point.close} />
    )
};