import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';

import { contract } from '../../index';


function createData(address, schemeName, name, contact, location, hospitalName, hospitalContact) {
    return { address, schemeName, name, contact, location, hospitalName, hospitalContact };
}

const rows = [
    createData('Frozen yoghurt', "sdffdsf sfsf sfsfsf", 'abc', 'adafafads', "adffadf", "dff", 1234455),
    createData('Ice cream sandwich', "237dv sdscscdds dfsfsf", 'sdf', "fdfsfs", "adffadf", "dsssss", 1234554),
    createData('Eclair', "cdsdsv gs dss f262", 'dsd', "dafadf", "adfa", "ssdadad", 221341141),
    createData('Cupcake', "sdfsgsf sfsfsgsg", 'dsf', "dfaafff", "adfa", "adfadfa", 2434234),
    createData('Gingerbread', "dfaf sfs s16.0", 'dsc', "dfafacxc", "adfa", "sdfaf", 1222222),
];


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

export default function ApprovedClaims() {
    function doFirst() {
        setTimeout(checkLogin, 200)
    }

    useEffect(doFirst, [])
    return (
        <Container className='bg-light rounded shadow p-5 mt-4'>
            <br />
            <div>
                <h3>LIST OF APPORVED CLAIMS</h3><hr />
            </div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="center">Scheme Name</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Hospital Name</TableCell>
                            <TableCell align="center">Hospital Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.address}
                                </TableCell>
                                <TableCell align="center">{row.schemeName}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.contact}</TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                                <TableCell align="center">{row.hospitalName}</TableCell>
                                <TableCell align="center">{row.hospitalContact}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}