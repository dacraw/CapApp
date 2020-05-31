import React from 'react';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(field){
        return e => {
            this.setState({ [field]: e.currentTarget.value });
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.action(this.state);
    }

    render() {
        let errors;
        // debugger;

        // check if errors state exists; if it does, access the session errors as an array
        if (this.props.errors.session[0] !== undefined){
            // debugger;
            let errs = Object.values(this.props.errors.session); 
            errors = errs.map( (error, i) => <li key={i}>{error}</li>);
        } 

        return (
            <>
                <ul className="session-errors">
                    {errors}
                </ul>
                
                <form className="session-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" value={this.state.username} id="username" onChange={this.handleInput('username')} />
                    <br/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" value={this.state.password} onChange={this.handleInput('password')} />
                    <button type="submit">{this.props.formType}</button>
                </form> 
            </>
        )
    }
}
export default SessionForm;