import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';


import { contract, userAddress } from '../../index';


function createData(companyAddress, schemeId, schemeName, premium, benifit, conditions) {
    return { companyAddress, schemeId, schemeName, premium, benifit, conditions };
}

function checkLogin() {
    async function getLogin() {
        try {
            let tx = await contract.login();
            if ((tx * 1) !== 2) {
                window.location.href = "/"
            }
        } catch {
            window.location.href = "/"
        }
    }

    getLogin();
}

export default function ViewSchemes() {
    const [rows, updateRows] = useState([])
    function getData() {
        async function getSchemesData() {
            try {
                let data = await contract.getSchemes(userAddress);
                document.getElementById('progress').classList.add("d-none");
                displayData(data);
            } catch {
                alert("unable to get data")
            }
        }
        getSchemesData();

    }

    function displayData(data) {
        // updateRows([])
        data.map((value, index) => {
            let companyAddress = value.companyAddress
            let schemeName = value.schemeName
            let schemeId = value.schemeId
            let premium = value.premium._hex * 1
            let benifit = value.benifit._hex * 1
            let conditions = value.conditions

            updateRows((previous) => {
                return [
                    ...previous,
                    createData(companyAddress, schemeId, schemeName, premium, benifit, conditions)
                ]
            })
            return 0;
        });
    }

    function doFirst() {
        setTimeout(checkLogin, 200)
        setTimeout(getData, 500)
    }
    // eslint-disable-next-line
    useEffect(doFirst, [])

    return (
        <Container className='bg-light rounded shadow p-4 mt-4'>
            <div>
                <h3 className="text-secondary mt-3">LIST OF AVAILABLE SCHEMES</h3> <hr />
            </div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of the Scheme</TableCell>
                            <TableCell align="center">Premium</TableCell>
                            <TableCell align="center">Benefits</TableCell>
                            <TableCell align="center">Conditions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.schemeId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.schemeName}
                                </TableCell>
                                <TableCell align="center">{row.premium}</TableCell>
                                <TableCell align="center">{row.benifit}</TableCell>
                                <TableCell align="center">{row.conditions}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <center id="progress"><br /><CircularProgress /></center>
            <center><br />
                {
                    rows.length === 0 ? <h3 className='text-secondary'>No Schemes Added Yet</h3> : ""
                }
            </center>
        </Container>
    );
}