import React from 'react';
import {Link} from 'react-router-dom'

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            fname: "",
            lname: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        // check if something is after '@'      Please enter a part following '@'. `${inputValue}` is incomplete.
        // if (inputValueArr[0] === '@' || ) return `Please include an '@' in the email address. '${inputValue}' is missing an '@'.`
        // check if there's a '.' after '@'     Please match the requested format.
    }

    showErrorBox(message){
        const errorBox = document.querySelector('.session-error-box');
        // select the span inside the errorBox and set its messge to the error message
        errorBox.querySelector('span').innerText = message;
        errorBox.classList.add('show');
    }
    
    handleSubmit(e){
        e.preventDefault();

        // validate email address to show error box if needed
        const emailErrorMessage = this.validateEmail();

        if (emailErrorMessage !== undefined){
            this.showErrorBox(emailErrorMessage)
        }
        // submit infomation for error handling
        this.props.submit(this.state)
    }

    render () {
        let errors;
        // debugger;
        if (this.props.errors[0].length > 0) {
            errors = this.props.errors.map((error, i)=><li key={i}>{error}</li>);
        }
        return (
            <div className="signup-container">
                <div className="signup-form">
                    <form className="session-form" onSubmit={this.handleSubmit}>
                        <img className="logo" src={window.logo} />
                        <h1>Get Into The Game</h1>
                        <h2>CapApp lets you easily invest for your future.</h2>
                        <div className="double-column">
                            <input id="fname" placeholder="First name" className="form-user-names" onChange={this.handleInput('fname')} type="text" value={this.state.fname} />
                            <input id="lname" placeholder="Last name" className="form-user-names" onChange={this.handleInput('lname')} type="text" value={this.state.lname} />
                        </div>
                        <div className="rows">
                            <input placeholder="Email" id="email" onChange={this.handleInput('email')} type="text" value={this.state.email} />
                            <div className="session-error-box"><div className="arrow-up-outer"></div><div className="arrow-up-inner"></div><i className="fas fa-exclamation-triangle"></i><span>Please fill out this field.</span></div>
                            <input placeholder="Password (min. 6 characters)" id="password" onChange={this.handleInput('password')} type="password" value={this.state.password} />
                        </div>
                        <div className="double-column">
                            <button type="submit">Continue</button>
                            <p>Already started?
                                <Link to="/forgot" className="forgot"> Login to complete your application.</Link>
                            </p>
                        </div>
                        <ul className="signup-invalid-credentials">
                            {errors}
                        </ul>
                    </form>
                </div>
                <div className="signup-aside">
                    <h3>Lorem ipsum dolor sit amet</h3>
                    <p>Vivamus tristique aliquam risus convallis malesuada. Aenean fermentum interdum nulla, sit amet lacinia est placerat sit amet.</p>
                    <h3>Maecenas sem lectus</h3>
                    <p>Pellentesque elit nunc, viverra sed metus sed, viverra commodo justo.</p>
                    <h3>Praesent pharetra leo et tortor blandit viverra</h3>
                    <p>Praesent maximus quam a sem malesuada, et ullamcorper purus porttitor. </p>
                </div>
            </div>
        )
    }
}

export default Signup;


