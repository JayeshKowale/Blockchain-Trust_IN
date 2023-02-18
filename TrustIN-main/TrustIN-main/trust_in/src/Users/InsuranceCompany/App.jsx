import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/src/collapse"

import { Outlet, NavLink} from 'react-router-dom'
import "bootstrap/js/dist/dropdown"


const activeNav = ({ isActive }) => {
    return {
        display: "block",
        margin: "0rem 5px",
        padding: "1rem .5rem",
        fontWeight: isActive ? "bold" : "",
        color: isActive ? "#4169E1" : "",
    };
}

export default function App() {
    return <>
        <nav className="navbar navbar-expand-md sticky-top navbar-light bg-light" style={{ zoom: 1.1 }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/insurance-company/">Insurance</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" style={activeNav} to="/insurance-company/">Home</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" style={{ margin: "0rem 5px", padding: "1rem .5rem" }} to="" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Schemes
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/insurance-company/add-scheme">Add Scheme</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/insurance-company/view-schemes">View Schemes</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/insurance-company/requested-schemes">Requested Schemes</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/insurance-company/approved-schemes">Approved Schemes</NavLink></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" style={{ margin: "0rem 5px", padding: "1rem .5rem" }} to="" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Claims
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><NavLink className="dropdown-item" to="/insurance-company/requested-claims">Requested Claims</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/insurance-company/approved-claims">Approved Claims</NavLink></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <Outlet />
    </>
}