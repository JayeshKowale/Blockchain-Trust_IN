import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from 'react-bootstrap';
import Button from '@mui/material/Button';

import { contract } from '../../index';


function createData(address, name, contact, location, previousMedicalRecords, accpetDecline) {
    return { address, name, contact, location, previousMedicalRecords, accpetDecline };
}

const rows = [
    createData('Frozen yoghurt', "sdffdsf sfsf sfsfsf", 'abc', 'adafafads', <Button variant="outlined">Click Here</Button>, <Button variant="outlined">Accpet</Button>),
    createData('Ice cream sandwich', "237dv sdscscdds dfsfsf", 'sdf', "fdfsfs", <Button variant="outlined">Click Here</Button>, <Button variant="outlined">Accept</Button>),
    createData('Eclair', "cdsdsv gs dss f262", 'dsd', "dafadf", <Button variant="outlined">Click Here</Button>, <Button variant="outlined">Accept</Button>),
    createData('Cupcake', "sdfsgsf sfsfsgsg", 'dsf', "dfaafff", <Button variant="outlined">Click Here</Button>, <Button variant="outlined">Accept</Button>),
    createData('Gingerbread', "dfaf sfs s16.0", 'dsc', "dfafacxc", <Button variant="outlined">Click Here</Button>, <Button variant="outlined">Accept</Button>),
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

export default function RequestedSchemes() {
    function doFirst() {
        setTimeout(checkLogin, 200)
    }

    useEffect(doFirst, [])


    return (
        <Container className='bg-light rounded shadow p-5 mt-4'>
            <br />
            <div>
                <h3>LIST OF REQUESTED SCHEMES</h3><hr />
            </div>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Previous Medical Records</TableCell>
                            <TableCell align="center">Accept/Decline</TableCell>
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
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.contact}</TableCell>
                                <TableCell align="center">{row.location}</TableCell>
                                <TableCell align="center">{row.previousMedicalRecords}</TableCell>
                                <TableCell align="center">{row.accpetDecline}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}