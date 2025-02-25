import React, { useContext } from "react";
import {Link} from "react-router-dom";
import newlog from '../assets/logo.png';
import { AuthContext } from "../context/AuthContext";
import {FaUserCircle} from "react-icons/fa";


const MainNav = () => {
    const {isLoggedIn,token, logout}= useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                <img src={newlog} alt="logo" width="50" height="50" className="d-inline-block"/>
                
                <span className="ms-2" style={{color:"gold",fontStyle:"italic",fontWeight:"bold"}}>SportsPicker</span>
            
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="toggle navigation">
                    
                    <span className="navbar-toggler-icon"></span>

                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>

                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to= "/about">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to= "/projections">Projections</Link>
                        </li>

                        

                    </ul>

                    <div className="ms-auto">
                        {isLoggedIn ? (
                            <div className="d-flex align-items-center">
                                <FaUserCircle size={24} className="me-3" title={token?.username}/>
                                <span className="text-white me-2">{token?.username}</span>
                                <button className="btn btn-danger" onClick={logout}>
                                    Logout
                                </button>
                            </div>
                        ):(
                            <Link className="nav-link text-white" to ="/login">
                                <FaUserCircle size={24} className="me-3" title="Login"/>
                            </Link>
                        
                        )}
                    </div>
                </div>
            

          </div>
        </nav>
    );
};

export default MainNav;