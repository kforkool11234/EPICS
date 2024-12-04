import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import './Navbar.css'; 
import { FaUserCircle } from "react-icons/fa";
import { Routes, Route, Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // For hamburger menu
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For user dropdown

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false); 
    };

    // Toggle dropdown when user icon is clicked
    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    // Close the dropdown if clicked outside (optional)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest('.usericon') === null) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar">
            <div className="logo"><img src="imgs/sevase.png" width="150px" alt="Logo" /></div>
            <div className="usericon" onClick={toggleUserDropdown}>
                <FaUserCircle />
                {isUserDropdownOpen && (
                    <div className="user-dropdown">
                        <ul>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/logout">Logout</a></li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} size="lg" />
            </div>
            
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <div className="close-button" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </div>
                <ul>
                  <Link to={`/`}> <li><a href="/">Home</a></li></Link>
                  <Link to={`/form`}> <li><a href="/registration">Registration</a></li></Link>
                  <Link to={`blog`}> <li><a href="/blogs">Blogs</a></li></Link>
                  <Link to={`about`}> <li><a href="/about">About Us</a></li></Link>
                  <Link to={`contact`}> <li><a href="/contact">Contact Us</a></li></Link>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
