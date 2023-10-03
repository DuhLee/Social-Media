import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import decode from 'jwt-decode';

import useStyles from './styles.js';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {

    const classes = useStyles();

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

    },[location])


    return (
        <AppBar className={classes.appBar} style={{ flexDirection: 'row', position: 'static' }} color="inherit">
            <Link to="/" className={classes.brandContainer} style={{ color: '#1976d2',textDecoration: 'none'}}>
                <img className={classes.image} src={memoriesLogo} alt="memoriesLogo" height="60"></img>
                {/* <img className={classes.image} src={memoriesText} alt="memoriesText" height="60"></img> */}
                <Typography variant='h2'>BLOG</Typography>
            </Link>
            <Toolbar className={classes.toolbar} >
                { user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} >
                            {user.result.name.charAt(0)}
                        </Avatar>
                            <Typography className={classes.userName} variant="h6"  >{user.result.name}</Typography>
                            <Button onClick={ logout } variant="contained" className={classes.logout} color="error" >로그아웃</Button>
                    </div>
                ) : (
                    <Button component={ Link } to="/auth" variant="contained" color="primary" >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar