import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@mui/material'; 
import LockOutlinedIcon from '@mui/icons-material/LockOutlined.js'
import { useGoogleLogin, GoogleLogin, googleLogout } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';

import { oauth, signin, signup } from '../../actions/auth';  
import Input from './Input';
import useStyles from './styles';

const initialState = { 
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    };

const Auth = () => {

    const classes = useStyles();

    const history = useHistory();

    const [ formData, setFormData ] = useState(initialState);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false);
    const dispatch = useDispatch();

    const googleError = () => console.log('Google Sign In was unsuccessful. Try again later')

    const googleSuccess = async (res) => {
        console.log(res);
        console.log(jwtDecode(res.credential));

        const decodedCredential = jwtDecode(res?.credential);

        try {
            dispatch(oauth(decodedCredential, history));

        } catch (error) {
            console.log(error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: googleSuccess,
        onError: googleError,
        ux_mode: 'popup',
        type: 'standard',

    })

    const handleShowPassword = () => {
        setShowPassword( (prevShowPassword) => !prevShowPassword );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))

        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3} >
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="5" >{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit} >
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half ></Input>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half  ></Input>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password"  handleChange={handleChange} type={ showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    <GoogleLogin 
                        onSuccess={ googleSuccess }
                        onError={ googleError }
                        ux_mode='popup'
                        type='standard'
                        size='large'
                    />

                    <Button className={classes.googleButton} onClick={ () => googleLogin() }>Google Log In</Button>

                    <Button type="submit" variant='contained' color="primary" className={classes.submit} fullWidth >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end" >
                        <Grid item >
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button> 
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth