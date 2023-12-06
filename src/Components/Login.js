import React, { useState, useContext } from 'react'
import {Link, useNavigate } from "react-router-dom";
import alertContext from '../contexts/alert/alertContext';
import noteContext from '../contexts/notes/noteContext';

const Login = () => {
    const [cred, setCred] = useState({ email: "", password: "" });
    let navigate = useNavigate()
    const context = useContext(alertContext);
    const notectx = useContext(noteContext);
    const {saveToken, token} = notectx;
    const {showAlert} = context;

    if(token){showAlert("primary", "User already logged in."); navigate('/')}

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

            },

            body: JSON.stringify({email:cred.email, password: cred.password}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        const status = await response.status
        if (status === 200){
            localStorage.setItem('token', json.authToken); // saving the auth-token to localstorage
            saveToken();
            showAlert('success', 'User Logged in successfully')
            navigate('/')
        }
        else{
            showAlert('danger', 'Invalid Username or password.');
            setCred({email: "", password: ""});
        }

    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Login Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onchange} value={cred.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={cred.password} />
                </div>

                <button type="submit" className="btn btn-primary me-5">Submit</button>
                <Link to="/register" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">New user? Register</Link>
            </form>
        </div>
    )
}

export default Login
