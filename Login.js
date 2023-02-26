import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('key');
        if (auth) {
            navigate('/')
        }
    })

    const handleLogin = async () => {
        //console.log(email,password);
        let result = await fetch('http://localhost:5600/login',
            {
                method: "post",
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        result = await result.json();
        console.log(result)
        if (result.auth) {
            localStorage.setItem('key', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        } else {
            alert("Please Enter Correct Details")
        }
    }

    return (
        <div className="register">
            <h2 className="ls-title">User Login </h2>

            <input className='inputBox' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <input className='inputBox' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />

            <button onClick={handleLogin} className='appbtn' type="button" >Login</button>
            <Link to="/signup" className="inorup"><p>New user? </p></Link>
        </div>
    )
}

export default Login;