import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Alert } from './Alert';
import '../App.css';

const Login = (props) => {
    props.setprogress(0)
    const [crediantials, setCrediantials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        props.setprogress(10)
        e.preventDefault();
        const response = await fetch(`api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: crediantials.email, password: crediantials.password })
        })
        props.setprogress(20)
        const json = await response.json()
        props.setprogress(50)
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.setprogress(90)
            navigate('/');
            props.setprogress(100)
        }
        else {
            props.setprogress(100)
            props.showAlert("*Invalid Crediantials! Please try again");

        }
    };

    const handleOnChange = (e) => {
        setCrediantials({ ...crediantials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <div className='form-template' id='form-login' >
                <div className='head'>
                    <h3 className='form-title'>Login</h3>
                </div>

                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" value={crediantials.email} onChange={handleOnChange} className="form-control" id="email" aria-describedby="emailHelp" name='email' required />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" value={crediantials.password} onChange={handleOnChange} className="form-control" id="password" name='password' required />
                        {/* <Link to="#" className='forgot'>Forgot?</Link> */}
                        <button type="submit" className="btn btn-primary form-btn">Login</button>
                    </form>
                    <Alert alert={props.alert} />
                    <div className='log-sig-redirect'>Don't have an account? <Link to='/signup'>Sign Up</Link></div>

                </div>

            </div>
        </div>
    )
}

export default Login