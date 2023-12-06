import React, { useState, useContext } from 'react'
import { useNavigate, Link } from "react-router-dom";
import alertContext from '../contexts/alert/alertContext';
import noteContext from '../contexts/notes/noteContext';

const Register = () => {

  let navigate = useNavigate()
  const context = useContext(alertContext);
  const { showAlert } = context;
  const notectx = useContext(noteContext);
  const {saveToken, token} = notectx;

  if(token){showAlert("primary", "User already registered."); navigate('/')}


  const [cred, setCred] = useState({name:"", email:"", password:""});

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

            },

            body: JSON.stringify({name:cred.name,email:cred.email, password: cred.password}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        const status = await response.status
        if (status === 200){
            localStorage.setItem('token', json.authToken); // saving the auth-token to localstorage
            saveToken();
            showAlert('success', 'User Registered successfully')
            navigate('/')
        }
        else{
            if(json.error){
              // console.log("error",json.error);
              showAlert('alert', json.error);
            }
            else if(json.errors){
              console.log("errors",json.errors);
              showAlert('alert', json.errors[0].msg);
            }
            setCred({name:"", email: "", password: ""});
        }
  }

  const onchange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
}
  return (
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" >
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" describedby="nameHelp" onChange={onchange} value={cred.name} />
          <div id="nameHelp" className="form-text">We'll never share your name with anyone else.</div>
        </div>
        <div className="mb-3" >
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} value={cred.email} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={cred.password} />
        </div>

        <button type="submit" className="btn btn-primary me-5">Submit</button>
        <Link to="/register" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Already registered? Login.</Link>
      </form>
    </div>
  )
}

export default Register
