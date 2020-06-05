import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import StockShowSidebarContainer from './stock_show_sidebar_container'

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
                    <p>MAIN</p>
                </section>
                <aside>
                    <Route path='/stocks/:symbol' component={StockShowSidebarContainer} />
                </aside>
            </main>
        )
    }
}

export default FunctionalComponent;