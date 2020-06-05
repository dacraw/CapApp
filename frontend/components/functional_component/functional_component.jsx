import React, {Component} from 'react'
import {Route} from 'react-router-dom'

class FunctionalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    showBox(e){
        e.preventDefault();
        debugger
        e.currentTarget.nextSibling.classList.toggle('show');
    }
    
    render() {
        return (
            <main className="functional-component-container">
                <section className="main">
                    <p>MAIN</p>
                </section>
                <aside>
                    <ul className="buy-sell">
                        <li className="selected">Buy TSLA</li>
                        <li>Sell TSLA</li>
                    </ul>
                    <hr />
                    <section>
                        <form className="pst-form">
                            <section className="line">
                                {/* <i class="fas fa-arrows-alt-v"></i> */}
                                <label>Invest In</label>
                                <select defaultValue="Shares">
                                    <option>Shares</option>
                                    <option>Dollars</option>
                                </select>
                            </section>
                            <section className="line">
                                <label>Shares</label>
                                <input type="number" placeholder="0" />
                            </section>
                            <section className="line">
                                <label>Market Price</label>
                                <data className="cost-credit">$12.99</data>
                            </section>
                            <hr />
                            <section className="line cost-credit">
                                <label>Estimated cost</label>
                                <data>$12.99</data>
                            </section>
                            <button>Review Order</button>
                        </form>
                    </section>
                    <hr />
                    <section className="buying-power">
                            <span onClick={this.showBox}>$10,000 available for trading. </span>
                            <p className="info-box">
                                Good luck!  
                            </p>
                            <i className="fas fa-question-circle"></i>
                    </section>
                </aside>
            </main>
        )
    }
}

export default FunctionalComponent;