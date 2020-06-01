import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ currentUser, logout }) => {
    
    if (currentUser) { 
        return (
            <nav className="header-nav">
                    <h2>Logged In</h2>
                    <p>{currentUser.username}</p>
                    <button onClick={logout}>logout</button>
            </nav>
        )
    } else { 
        return (
            <>
                
            </>
        )
    }
};

export default NavBar