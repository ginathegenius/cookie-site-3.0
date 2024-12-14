import React from 'react';
import {Link, NavLink} from 'react-router-dom';
// import { NavbarBrand } from 'react-bootstrap';

const Navigation=()=>{

    return (    
        <div className='navBar'>
            <div className='home'>
                <NavLink to="/">Home</NavLink>
            </div>
            <div className='cookie-library'>
                <NavLink to="/cookie-library">Past Cookies</NavLink>
            </div>
            <div className='voting'>
                <NavLink to="/voting">Voting</NavLink>
            </div>
        </div>
    )

}

export default Navigation;