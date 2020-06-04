import React from 'react';
import {Link} from 'react-router-dom'

class Signup extends React.Component {
    constructor(props){
        super(props)
        // username here instead of email since it's the name of the col in db
        // email will be used otherwise in this page
        this.state = {
            username: "",
            password: "",
            fname: "",
            lname: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // clear errors if there are any and the user changes routes
    componentWillUnmount(){
        this.props.clearErrors();
    }

    handleInput(field) {
        return e => {
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    validateEmail(){
        const inputValue = document.getElementById('email').value;
        // convert to array to use .includes method
        const inputValueArr = inputValue.split("");
        // return a string if validation fails; first return stops the rest from happening; if no msg is returned and it's undefined, then validation succeeded
        // check if '@' is in email '           Please include an '@' in the email address. `${inputValue}` is missing an '@'.
        if (!inputValueArr.includes('@')) return `Please include an '@' in the email address. '${inputValue}' is missing an '@'.`
        // check if there's multiple '@'     A part following '@' should not contain the symbol '@'
        if (inputValue.split('@').length > 2) return `A part following '@' should not contain the symbol '@'.`
        // check if something is after '@'      Please enter a part following '@'. `${inputValue}` is incomplete.
        if (inputValueArr[0] === '@' || !inputValue.split('@')[1].length) return `Please enter a part following '@'. ${inputValue} is incomplete.`
        // check if there's a '.' after '@'     Please match the requested format.
        if (!inputValue.split('@')[1].includes('.')) return `Please match the requested format.`
        // check if there's something after '.' '.' is used at a wrong position in ${inputValue}.
        if (inputValue.split('@')[1].includes('.') && !inputValue.split('.')[1].length) return `'.' is used at a wrong position in '${inputValue.slice(inputValue.indexOf('@')+1)}'.`
  
        return null;
    }

    showErrorBox(message){
        const errorBox = document.querySelector('.session-error-box');
        // if message is null, hide the box and return
        
        if (message === null) {
            errorBox.classList.remove('show');
            return
        }
        // select the span inside the errorBox and set its messge to the error message
        errorBox.querySelector('span').innerText = message;
        errorBox.classList.add('show');
    }

    hideError() {
        const errorBox = document.querySelector('.session-error-box');
        errorBox.classList.remove('show')
    }

    handleEmpty(){
        const $sessionForm = $('.session-form');
        const $emptyInputs = $('input[value=""]');
        // add onchange handler to inputs to remove empty class when user types
        $emptyInputs.change(e => e.currentTarget.classList.remove('empty'))
        // add empty to all empty inputs
        $sessionForm.find($emptyInputs).addClass('empty');
        // cursor into first empty text input
        $sessionForm.find($emptyInputs).first().focus(); 
    }
    
    handleSubmit(e){
        e.preventDefault();
        
        // only validate email if the field has a value
        const emailErrorMessage = this.validateEmail();
        if (document.getElementById('email').value && emailErrorMessage !== null){
            $('#email').focus();
            this.showErrorBox(emailErrorMessage);
        } else {
            this.handleEmpty();
        }

        // add styles to empty inputs
       
        // submit infomation for error handling
        this.props.submit(this.state)
    }

    render () {
        let errors;
        
        if (this.props.errors[0].length > 0) {
            errors = this.props.errors.map((error, i)=><li key={i}>{error}</li>);
        }
        return (
            <div className="signup-container">
                <div className="signup-form">
                    <section className="demo-user">
                        <button onClick={this.props.demoUser}>Click Here To Demo<i className="fas fa-comment-dollar"></i></button>
                    </section>
                    <form className="session-form" onSubmit={this.handleSubmit}>
                        <img className="logo" src={window.logo} />
                        <h1>Get Into The Game</h1>
                        <h2>CapApp lets you easily invest for your future.</h2>
                        <div className="double-column">
                            <input id="fname" placeholder="First name" className="form-user-names" onChange={this.handleInput('fname')} type="text" value={this.state.fname} />
                            <input id="lname" placeholder="Last name" className="form-user-names" onChange={this.handleInput('lname')} type="text" value={this.state.lname} />
                        </div>
                        <div className="rows">
                            <div className="input-block">
                                <input placeholder="Email" id="email" onBlur={this.hideError} onChange={this.handleInput('username')} type="text" value={this.state.username} />
                                <div className="session-error-box signup"><div className="arrow-up-outer"></div><div className="arrow-up-inner"></div><i className="fas fa-exclamation-triangle"></i><span>Please fill out this field.</span></div>
                            </div>
                            <input placeholder="Password (min. 6 characters)" id="password" onChange={this.handleInput('password')} type="password" value={this.state.password} />
                        </div>
                        <div className="double-column continue">
                            <section>
                                <button type="submit">Continue</button>
                            </section>
                            <section>
                                <p>Already started?
                                    <Link to="/login" className="forgot"> Login to complete your application.</Link>
                                </p>
                            </section>
                        </div>
                        <ul className="signup-invalid-credentials">
                            {errors}
                        </ul>
                    </form>
                    <div className="disclosure">
                        <p>All investments involve risk and the past performance of a security, or financial product does not guarantee future results or returns. Keep in mind that while diversification may help spread risk it does not assure a profit, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities, or other financial products. Investors should consider their investment objectives and risks carefully before investing.</p>
                        <p>All securities and investments are offered to self-directed customers by Robinhood Financial, LLC, member <a href="http://www.finra.org">FINRA</a> & <a href="http://www.sipc.org">SIPC</a>. Additional information about your broker can be found by clicking <a href="http://www.brokercheck.finra.org">here</a>. Robinhood Financial, LLC is a wholly owned subsidiary of Robinhood Markets, Inc.</p>
                        <p>Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on <a href="http://www.brokercheck.finra.org">FINRA's BrokerCheck.</a></p>
                        <ul className="links">
                            <li><Link to='/terms'>Robinhood Terms & Conditions</Link></li>  
                            <li><Link to='/disclosure'>Disclosure Library</Link></li>
                            <li><Link to='/contact'>Contact Us</Link></li>
                            <li><Link to='/faq'>FAQ</Link></li>
                        </ul>
                        <p>© 2020</p>
                    </div>
                </div>
                <div className="signup-aside">
                    <main>
                        <h3>Lorem ipsum dolor sit amet</h3>
                        <p>Vivamus tristique aliquam risus convallis malesuada. Aenean fermentum interdum nulla, sit amet lacinia est placerat sit amet.</p>
                        <h3>Maecenas sem lectus</h3>
                        <p>Pellentesque elit nunc, viverra sed metus sed, viverra commodo justo <a href='http://www.sipc.org'>www.sipc.org</a>.</p>
                        <h3>Praesent pharetra leo et tortor blandit viverra</h3>
                        <p>Praesent maximus quam a sem malesuada, et ullamcorper purus porttitor. </p>
                    </main>
                    <div className="disclosure">
                        <p>All investments involve risk and the past performance of a security, or financial product does not guarantee future results or returns. Keep in mind that while diversification may help spread risk it does not assure a profit, or protect against loss, in a down market. There is always the potential of losing money when you invest in securities, or other financial products. Investors should consider their investment objectives and risks carefully before investing.</p>
                        <p>All securities and investments are offered to self-directed customers by Robinhood Financial, LLC, member <a href="http://www.finra.org">FINRA</a> & <a href="http://www.sipc.org">SIPC</a>. Additional information about your broker can be found by clicking <a href="http://www.brokercheck.finra.org">here</a>. Robinhood Financial, LLC is a wholly owned subsidiary of Robinhood Markets, Inc.</p>
                        <p>Check the background of Robinhood Financial LLC and Robinhood Securities, LLC on <a href="http://www.brokercheck.finra.org">FINRA's BrokerCheck.</a></p>
                        <ul className="links">
                            <li><Link to='/terms'>Robinhood Terms & Conditions</Link></li>  
                            <li><Link to='/disclosure'>Disclosure Library</Link></li>
                            <li><Link to='/contact'>Contact Us</Link></li>
                            <li><Link to='/faq'>FAQ</Link></li>
                        </ul>
                        <p>© 2020</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;


