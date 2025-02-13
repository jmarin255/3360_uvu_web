import React from "react";
import {Link} from "react-router-dom"
import newlog from '../assets/logo.png'


const MainNav = () => {
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
                </div>
            

          </div>
        </nav>
    );
};

export default MainNav;