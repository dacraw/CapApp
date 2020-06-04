import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <main className="splash-main">
                <section className="splash-component-1">
                    <aside className="left">
                        <h1>Invest in <br /><span>You.</span></h1>
                        <h2>CapApp helps you invest for your future with its simple and effective investment trading tools.</h2>
                        <Link className="signup-button" to='/signup'>Sign Up</Link>
                    </aside>
                    <img src={window.laptopTwo}></img>
                </section>
                <section className="splash-component-2">
                    <article>
                        <h1>Invest for Fun.<br />
                        Then Invest for your Future.</h1>
                        <h2>Start with $10,000<i className="fas fa-info-circle"></i> to use for trading and buying stocks, bonds, cryptocurrency, ETFs, and more.<br />
                        Get comfortable exchanging using CapApp so you can do the real thing.</h2>
                        <h3><i className="fas fa-info-circle"></i> The money is not real. </h3>
                    </article>
                </section>
                <section className="splash-component-3">
                    <article>
                        <aside>
                            <h1>Introducing this CapApp</h1>
                            <h2>Invest in thousands of stocks with as little as $0, since the money is fake.</h2>
                            <div className="three-col">
                                <div>
                                    <h3>Invest your fake money.</h3>
                                    <h4>Choose how much you want to invest, and lorem ipsum dolar sit amet.</h4>
                                </div>
                                <div>
                                    <h3>Build a virtual portfolio</h3>
                                    <h4>Stock API is used to pull current market prices.</h4>
                                </div>
                                <div>
                                    <h3>Get practice</h3>
                                    <h4>Use this site to see how harmless investing is. It just requires patience.</h4>
                                </div>
                            </div>
                        </aside>
                        <img src={window.confetti} />
                    </article>
                </section>
                <section className="splash-footer-component">
                    <article>
                        <ul className="footer-social-media"> 
                            <li><a href='/personal_site' target="_blank">Personal Site</a></li>
                            <li><a href='https://github.com/dacrawford89' target="_blank">Github</a></li>
                            <li><a href='http://www.linkedin.com/in/doug-a-crawford' target="_blank">LinkedIn</a></li>
                        </ul>
                        <ul className="footer-page-nav"> 
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/signup'>Signup</Link></li>
                            <li><Link to='/'>Back to Top</Link></li>
                        </ul>
                    </article>
                    <div className="disclosure">
                        <h5>(c) 2020 CAP APP. All rights not reserved.</h5>
                        <p> Vestibulum ac enim eu turpis euismod mattis et non nunc. Maecenas porta ante vitae lectus egestas malesuada. Nulla quis enim et est auctor eleifend. </p>
                        <p> Mauris in lacus sed diam blandit pulvinar sit amet vitae libero. Sed tempus dolor non viverra hendrerit. </p>
                        <p> Donec porttitor feugiat mollis. Curabitur lacinia ex vitae velit posuere vulputate. Cras in dignissim tortor.</p>
                    </div>
                </section>
            </main>
        )
    }
}
export default Index;