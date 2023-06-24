import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import pic from '../image/pexels-chan-walrus-958545.jpg';
import {GoogleLogin} from 'react-google-login';

const clientId = "335997660934-uoasidvm8sigceqsl0o9ge19pfhupk2p.apps.googleusercontent.com";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onSuccess = (res)=>{
    console.log("Login successfully!",res.profileObj);
    localStorage.setItem("userEmail", res.profileObj.email);
    localStorage.setItem("authToken", res.profileObj.email);
    localStorage.setItem("flag", true);
    navigate("/")
  }
  const onFailure = (res)=>{
    console.log("Login Failed!",res);
  }
  return (
    <>
      <div style={{ backgroundImage: `url(${pic})`, height: '100vh', backgroundSize: 'cover' }}>
        <div className='container cen1' style={{ "width": "50rem", "maxHeight": "50rem" }}>
          <form onSubmit={handleSubmit}>

            <div className="mb-3 dar">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="dar">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3 dar">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>

            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/createuser" className='m-3 btn btn-danger'>Signup</Link>
            <div id="signInButton">
              <GoogleLogin clientId={clientId} buttonText="Login" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={true}/>
            </div>
          </form>

        </div>
        {/* <div><Footer /></div> */}
      </div>
    </>
  )
}
