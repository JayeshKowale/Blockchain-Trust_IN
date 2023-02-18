import React from 'react'

import { Outlet, NavLink } from 'react-router-dom'

import { contract } from './index'

const onClickLogin = a => {
    async function login() {
        try {

            let tx = await contract.login(); // requesting login to blockchain and this will return login status [note status in below 'switch' statement]

            // redirecting to user page
            switch (tx * 1) {
                case 1:
                    console.log("citizen")
                    localStorage.setItem("login-status", 1) //  login status to localStorage; using localStorage as session
                    // window.location.href = "/citizen/"
                    document.getElementById("citizenLink").click(); // changing to user/citizen component
                    break;
                case 2:
                    console.log("insurance company")
                    localStorage.setItem("login-status", 2)
                    // window.location.href = "/insurance-company/"
                    document.getElementById("insuranceCompanyLink").click(); // changing to user/insurance-company component
                    break;
                case 3:
                    console.log("hospital")
                    localStorage.setItem("login-status", 3)
                    // window.location.href = "/hospital"
                    document.getElementById("hospitalLink").click(); // changing to user/hospital component
                    break;
                case 4:
                    console.log("owner")
                    localStorage.setItem("login-status", 4)
                    // alert("Owner page is still in development")
                    // window.location.href = "/owner"
                    // document.getElementById("ownerLink").click(); // changing will be to user/owner component
                    document.getElementById("ownerLink").click(); // changing to user/owner component
                    break;
                default:
                    console.log("not user")
                    localStorage.setItem("login-status", -1)
                    alert("you are not a user");
            }
        } catch (e) {
            alert("Problem to login.. maybe there is connection problem");
        }
    }

    login();
    return a.preventDefault()
}

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
    // getLoginStatus();
    return <>
        <nav className="navbar navbar-expand-md sticky-top navbar-light bg-light" style={{ zoom: 1.1 }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">TRUST_IN</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" aria-current="page" style={activeNav} to="/">Home</NavLink>
                        <NavLink className="nav-link" style={activeNav} onClick={onClickLogin} to="/login">Login</NavLink>
                        <NavLink className="nav-link" style={activeNav} to="/signup">Signup</NavLink>
                        
                        <NavLink className="nav-link" id="citizenLink" hidden style={activeNav} to={"/citizen"}>User</NavLink>
                        <NavLink className="nav-link" id="insuranceCompanyLink" hidden style={activeNav} to={"/insurance-company"}>User</NavLink>
                        <NavLink className="nav-link" id="hospitalLink" hidden style={activeNav} to={"/hospital"}>User</NavLink>
                        <NavLink className="nav-link" id="ownerLink" hidden style={activeNav} to={"/owner"}>Owner</NavLink>
                    </div>
                </div>
            </div>
        </nav>
        <Outlet />
    </>
}

// if read
/*
var tx = await contract.login();
console.log(tx);
*/

// if write
/*
var tx3 = await contract.isVerifiedCitizen();//method is just for example, actual method will be different for their purpose and will get some parameters
await tx3.wait(); // must use on write operations
console.log(tx3); 
*/