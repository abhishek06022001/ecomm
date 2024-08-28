import { Box, Button, Container, Paper, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const onChangeInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "/users/register",
                { ...user }
            );
            localStorage.setItem('loggedIn', true);

            window.location.href = '/';

        } catch (error) {
            console.error(error.response.data);
        }
    }
    return (
        <>
            <Container maxWidth="sm" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Paper elevation={19} sx={{ height: "auto", width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h1>Register  </h1>
                        </div>
                        <div >
                            <TextField
                                onChange={onChangeInput}
                                id="name"
                                name="name"
                                style={{ width: "16rem", margin: "20px 0px" }}
                                label="Name"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        height: '2.5rem',

                                    },
                                }}
                                value={user.name}
                            />
                        </div>
                        <div >
                            <TextField
                                onChange={onChangeInput}
                                id="email"
                                name="email"
                                style={{ width: "16rem", margin: "20px 0px" }}
                                label="Email"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        height: '2.5rem',

                                    },
                                }}
                                value={user.email}
                            />
                        </div>
                        <div >
                            <TextField
                                onChange={onChangeInput}
                                type='password'
                                id="password"
                                name="password"
                                style={{ width: "16rem", margin: "20px 0px" }}
                                label="Password"
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        height: '2.5rem',
                                    },
                                }}
                                value={user.password}
                            />
                        </div>
                        <div  >
                            <Button type="submit" variant="contained" id="submitLogin">Submit </Button>
                        </div>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default Register