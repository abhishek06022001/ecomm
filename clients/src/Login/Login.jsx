import { Box, Button, Container, Paper, TextField } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../GlobalState';

function Login() {
  const navigate = useNavigate();
  const state = React.useContext(GlobalState);

  const [token, setToken] = state.token;
  const [user, setUser] = useState({
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
        "/users/login",
        { ...user }
      );
      if (res) {
         localStorage.setItem('loggedIn', true);
        setToken(res.data.accessToken);  
        navigate('/');
      }
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
              <h1>Login In </h1>
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

export default Login