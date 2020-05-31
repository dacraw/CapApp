import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = (props) => {
    // debugger;
    if (window.currentUser) { 
        return (
            <div className="greeting">
                    <h2>Logged In</h2>
                    <p>{window.currentUser.username}</p>
                    <button onClick={props.logout}>logout</button>
            </div>
        )
    } else { 
        return (
            <>
                <Link to='/signup'>Sign Up</Link>
                <Link to='/login'>Login</Link>
            </>
        )
    }
};

export default Greeting