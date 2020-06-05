import React, {Component} from 'react'
import {Route} from 'react-router-dom'

class FunctionalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <main className="functional-component-container">
                <section className="main">
                    <p>test</p>
                </section>
                <ul className="side-nav">
                    <li className="buy-sell">
                        <a>Buy TSLA</a>
                        <a>Sell TSLA</a>
                    </li>
                    <hr />
                    <li>
                        <form className="pst-form">
                            <section className="line">
                                <label>Invest In</label>
                                <select>
                                    <option selected>Shares</option>
                                    <option>Dollars</option>
                                </select>
                            </section>
                            <section className="line">
                                <label>Shares</label>
                                <input type="number" placeholder="0" />
                            </section>
                            <section className="line">
                                <label>Market Price</label>
                                <data>$12.99</data>
                            </section>
                            <section className="line">
                                <label>Market Price</label>
                                <data>$12.99</data>
                            </section>
                            <button>Review Order</button>
                            <hr />
                            <details className="buying-power">
                                $10,000 buying power available.
                            </details>
                        </form>
                    </li>
                </ul>
            </main>
        )
    }
}

export default FunctionalComponent;