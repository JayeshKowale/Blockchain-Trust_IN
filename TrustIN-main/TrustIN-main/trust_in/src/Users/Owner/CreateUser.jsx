import React, { useEffect } from "react"

import { contract } from './../../index';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';

import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import { Link } from 'react-router-dom'


async function register() {
    let userAddress = document.getElementById("address").value;
    let userNname = document.getElementById("name").value;
    let userContact = document.getElementById("contact").value;
    let userLocation = document.getElementById("location").value;
    let userType = document.querySelector('input[name="userType"]:checked').value;

    console.log(userAddress, userNname, userContact, userLocation, userType);
    try {
        var tx
        if ((userType * 1) === 2) {
            tx = await contract.addInsuranceCompany(userAddress, userNname, userContact, userLocation);
        } else if ((userType * 1) === 3) {
            tx = await contract.addHospital(userAddress, userNname, userContact, userLocation);
        } else if ((userType * 1) === 1) {
            // tx = await contract.addCitizen(userAddress, userNname, userContact, userLocation);
        } else {
            alert('Ha ha ha... You want to hack us!!!?🧐')
        }
        await tx.wait();
        alert("Account Created Successfully..")
    } catch (e) {
        alert("Unable to Create Account, your account may be already in system. try to login");
    }
}

function formSubmit(event) {
    register();
    event.preventDefault();
}

function checkLogin() {
    async function getLogin() {
        try {
            let tx = await contract.login();
            if ((tx * 1) !== 4) {
                window.location.href = "/"
            }
        } catch {
            window.location.href = "/"
        }
    }

    getLogin();
}

export default function CreateUser() {
    function doFirst() {
        setTimeout(checkLogin, 200)
    }

    useEffect(doFirst, [])
    return <>
        <Link className="nav-link" to="/">
            <Button color="primary">
                <ArrowCircleLeftOutlinedIcon fontSize="large" /> Go Back
            </Button>
        </Link>

        <div className="container mt-4 p-5 rounded shadow">
            <h1 className="text-secondary">Register Your Account</h1>
            <hr />
            <form onSubmit={formSubmit}>
                <FormControl className="border-bottom" fullWidth sx={{ my: 1 }} variant="standard">
                    <FormLabel id="userType-label">User Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="userType-label"
                    >
                        <FormControlLabel name="userType" value="2" control={<Radio />} label="Insuance Company" />
                        <FormControlLabel name="userType" value="3" control={<Radio />} label="Hospital" />
                        {/* <FormControlLabel name="userType" value="1" control={<Radio />} label="Citizen" /> */}
                    </RadioGroup>
                </FormControl>
                <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                    <TextField required id="address" name="address" label="Account Address" />
                </FormControl>
                <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                    <TextField required id="name" name="name" label="Name" />
                </FormControl>
                <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                    <TextField required id="contact" type="number" name="contact" label="Contact" />
                </FormControl>
                <FormControl fullWidth sx={{ my: 1 }} variant="standard">
                    <TextField required id="location" name="location" label="Location" />
                </FormControl>

                <hr />
                <Button variant="outlined" type="submit" className="p-2">Register <PersonAddAltSharpIcon /></Button>
            </form>
        </div>
    </>
}