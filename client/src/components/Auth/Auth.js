import React, {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material'
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import {gapi} from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {
    const [ isSignup, setIsSignUp ] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);
    const [ formData, setFormData ] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    gapi.load("client:auth2", () => { gapi.client.init({ clientId: "491476052501-rrqj250v8jnmd58095hvdaqfpmkv3rpv.apps.googleusercontent.com", plugin_name: "chat", }); });
    
    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    }
    const switchMode = () => { 
        setIsSignUp(prev => !prev);
        setShowPassword(false);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: { result, token }});
            navigate('/');
        } catch (error){
            console.log(error);
        }
    }
    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessfull. Try Again Later");
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Avatar>
                </Avatar>
                <Typography variant='h5'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            ) 
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup &&  <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange}/> }
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color="primary">
                        { isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='491476052501-rrqj250v8jnmd58095hvdaqfpmkv3rpv.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<GoogleIcon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Have an account, please Sign In' : 'Do not have an account, please Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
