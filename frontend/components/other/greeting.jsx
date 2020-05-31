import React from 'react';
import { Link } from 'react-router-dom';

const Greeting = ({ currentUser, logout }) => {
    // debugger;
    if (currentUser) { 
        return (
            <div className="greeting">
                    <h2>Logged In</h2>
                    <p>{currentUser.username}</p>
                    <button onClick={logout}>logout</button>
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