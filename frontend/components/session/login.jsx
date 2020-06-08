import React from 'react';
import {Link} from 'react-router-dom'
// import image from "../../../app/assets/images/gradient-1.jpg";

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
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

    handleEmpty(){
        let username = document.getElementById('username');
        let password = document.getElementById('password');
        
        // if user submits and field is empty, show the error box
        if (!username.value){
            let errorBox = username.nextSibling;
            errorBox.classList.add('show');
            return false;
        }
        if (!password.value){
            let errorBox = password.nextSibling;
            errorBox.classList.add('show');
            return false;
        }
        return true;
    }

    hideErrors(e) {
        e.currentTarget.nextSibling.classList.remove('show');
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.props.errors){
            document.querySelector('.login-invalid-credentials').style.display = "none";
        }
        if (this.handleEmpty()) this.props.submit(this.state);
    }


    render () {  
        
        let errors;
        let invalidCredentialCntr = document.querySelector('.login-invalid-credentials')

        // this conditional checks if errors exists AND if the DOM container is loaded;
        // this is to avoid errors when switching from the signup route to here
        if (this.props.errors && this.props.errors[0].length > 0 && invalidCredentialCntr) {
            errors = this.props.errors.map((error, i)=><li key={i}><i className="fas fa-exclamation-circle"></i> {error}</li>);
            invalidCredentialCntr.style.display = "block";
        }
        return (
            <div className="login-container">
                <img src={window.dollars} /> {/* gradient for login page */}
                <div className="login-form">
                    <section className="relative">
                        <section className="demo-user">
                            <button onClick={this.props.demoUser}>Click Here To Demo<i class="fas fa-comment-dollar"></i></button>
                        </section>
                        <div className="login-form-holder">
                            <form className="session-form" onSubmit={this.handleSubmit}>
                            <h1>Welcome to CapApp</h1>
                                <div className="input-block">
                                    <label htmlFor="username">Email or username</label>
                                    <input onFocus={this.hideErrors} id="username" title="Please fill out this field." onChange={this.handleInput('username')} type="text" value={this.state.username} />
                    
                                    <div className="session-error-box login"><div className="arrow-up-outer"></div><div className="arrow-up-inner"></div><i className="fas fa-exclamation-triangle"></i><span>Please fill out this field.</span></div>
                                </div>
                                <div className="input-block">
                                    <label htmlFor="password">Password</label>
                                    <input onFocus={this.hideErrors} id="password" title="Please fill out this field." onChange={this.handleInput('password')} type="password" value={this.state.password} />
                                    <div className="session-error-box login"><div className="arrow-up-outer"></div><div className="arrow-up-inner"></div><i className="fas fa-exclamation-triangle"></i> <span>Please fill out this field.</span></div>
                                </div>
                                
                                <ul className="login-invalid-credentials">
                                        {errors}
                                </ul>  
                                <button type="submit">Sign In</button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Login;


