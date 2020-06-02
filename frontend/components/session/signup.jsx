import React from 'react';
import {Link} from 'react-router-dom'

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
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

    handleSubmit(e){
        e.preventDefault();
        this.props.submit(this.state)
    }

    render () {
        let errors;
        debugger;
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
                            <input placeholder="Email" id="username" onChange={this.handleInput('username')} type="text" value={this.state.username} />
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


