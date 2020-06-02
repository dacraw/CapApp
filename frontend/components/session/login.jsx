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

    handleInput(field) {
        
        return e => {
            document.getElementById(field).nextSibling.style.display = "none";
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    handleEmpty(){
        let username = document.getElementById('username');
        let password = document.getElementById('password');
        
        if (!username.value){
            let errorBox = username.nextSibling;
            errorBox.style.display = "block";
            return false;
        }
        if (!password.value){
            let errorBox = password.nextSibling;
            errorBox.style.display = "block";
            return false;
        }
        return true;
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.props.errors){
            document.querySelector('.login-invalid-credentials').style.display = "none";
        }
        if (this.handleEmpty()) this.props.submit(this.state);
    }

    hideErrors(e) {
        e.currentTarget.nextSibling.style.display = "none";
    }

    render () {  
        // debugger;
        let errors;
        if (this.props.errors[0].length > 0) {
            errors = this.props.errors.map((error, i)=><li key={i}><i className="fas fa-exclamation-circle"></i> {error}</li>);
            document.querySelector('.login-invalid-credentials').style.display = "block";
        }
        return (
            <div className="login-container">
                <img src={window.image} />
                <div className="login-form">
                    <form className="session-form" onSubmit={this.handleSubmit}>
                    <h1>Welcome to CapApp</h1>
                        <div className="input-block">
                            <label htmlFor="username">Email or username</label>
                            <input onFocus={this.hideErrors} id="username" title="Please fill out this field." onChange={this.handleInput('username')} type="text" value={this.state.username} />
                            <p className="login-error-box">^ Please fill out this field.</p>
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Password</label>
                            <input onFocus={this.hideErrors} id="password" title="Please fill out this field." onChange={this.handleInput('password')} type="password" value={this.state.password} />
                            <p className="login-error-box">^ Please fill out this field.</p>
                        </div>
                        <Link to="/forgot" className="forgot">Forgot your username or password?</Link>
                        <ul className="login-invalid-credentials">
                            {errors}
                        </ul>
                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;


