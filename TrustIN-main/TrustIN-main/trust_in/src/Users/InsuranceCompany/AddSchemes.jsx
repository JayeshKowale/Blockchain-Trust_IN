import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Container, Form } from 'react-bootstrap'

import { contract } from '../../index';

async function addData(event) {
    let [schemeName, , premium, , benefits, , conditions] = event.target;
    [schemeName, premium, benefits, conditions] = [schemeName.value, premium.value, benefits.value, conditions.value]
    try {
        var tx = await contract.addInsuranceScheme(schemeName, premium, benefits, conditions);
        await tx.wait();
        alert("Scheme Created Successfully...")
    } catch (e) {
        alert("Unable to Create Scheme...");
    }
}

function formSubmit(event) {
    addData(event);
    event.preventDefault();
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

export default function AddSchemes() {
    function doFirst() {
        setTimeout(checkLogin, 200)
    }

    useEffect(doFirst, [])
    return <>
        <Container className='bg-light rounded shadow p-5 mt-4'>
            <h3 className='text-secondary'>Add a new Scheme</h3><hr />
            <Form onSubmit={formSubmit}>
                <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                    <TextField required id="schemeName" name="schemeName" label="Scheme Name" />
                </FormControl>

                <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                    <TextField required id="premium" type={"number"} name="premium" label="Premium" />
                </FormControl>

                <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                    <TextField required id="benefits" type={"number"} name="benefits" label="Benefits" />
                </FormControl>

                <Form.Group className="mb-4 border-top pt-2">
                    <Form.Label htmlFor="conditions">Conditions:</Form.Label>
                    <Form.Control rows="4" as="textarea" name="conditions" placeholder="Conditions for applying the scheme" id="conditions" />
                </Form.Group>

                <hr />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    </>

}