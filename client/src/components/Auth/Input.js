import React from 'react'
import { TextField, Grid, InputAdornment } from '@mui/material'
import { IconButton } from '@mui/material';
import { Visibility , VisibilityOff } from '@mui/icons-material'
const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {

    return (
        <Grid item xs={12} sm={ half ? 6 : 12}>
            <TextField 
                name={name} 
                label={label} 
                type={type} 
                autoFocus={autoFocus} 
                onChange={handleChange} 
                variant='outlined' 
                required 
                fullWidth 
                InputProps={(name === 'password') ? {
                     endAdornment : (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} >
                                { type === 'password' ? <Visibility /> : <VisibilityOff /> }
                            </IconButton>
                        </InputAdornment> 
                     ),
                } : null } 
            />
        </Grid>
    )
}

export default Input