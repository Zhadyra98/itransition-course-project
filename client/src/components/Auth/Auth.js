import React, {useState} from 'react'
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signin, signup } from '../../actions/auth';
import { FormattedMessage } from "react-intl";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

export default function Auth() {
    const [ isSignup, setIsSignUp ] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);
    const [ formData, setFormData ] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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

    return (
            <div className='container'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-4 text-center">
                        <h1 className='h2 mb-3 font-weight-normal'>{isSignup? <FormattedMessage id="register.text"/> : <FormattedMessage id="login.text" />}</h1>
                        <form onSubmit={handleSubmit}>
                            { isSignup && ( <>
                                <FormattedMessage id="name.text">
                                    {(msg) => (
                                        <Input name="firstName" label={msg} handleChange={handleChange} autoFocus half/>
                                    )}
                                </FormattedMessage>
                                <FormattedMessage id="surname.text">
                                    {(msg) => (
                                        <Input name="lastName" label={msg} handleChange={handleChange} half/>
                                    )}
                                </FormattedMessage>
                            </>) }
                            <FormattedMessage id="email.text">
                                {(msg) => (
                                    <Input name="email" label={msg} handleChange={handleChange} type="email"/>
                                )}
                            </FormattedMessage>
                            <FormattedMessage id="password.text">
                                {(msg) => (
                                    <Input name="password" label={msg} handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                                )}
                            </FormattedMessage>
                            { isSignup &&  
                                <FormattedMessage id="confirmPass.text">
                                    {(msg) => (
                                        <Input name="confirmPassword" label={msg} type="password" handleChange={handleChange}/> 
                                    )}
                                </FormattedMessage>
                            }
                            <div className="my-3">
                                <button type="submit" className='btn btn-primary btn-lg w-100'>
                                    {isSignup ? <FormattedMessage id="register.button"/> : <FormattedMessage id="login.button" />}
                                </button>
                            </div>
                            <p onClick={switchMode} className="link-primary text-decoration-underline">
                            { isSignup ? <FormattedMessage id='toLogin.text'/> : <FormattedMessage id='toRegister.text'/>}
                            </p>
                        </form>
                    </div> 
                </div>
            </div>
    )
}
