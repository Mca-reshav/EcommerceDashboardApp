import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('key')
        if (auth) {
            navigate('/')
        }
    })

    const collectData = async () => {

        let result = await fetch('http://localhost:5600/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem('key', JSON.stringify(result.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            var date = new Date();
            alert(name + " is logged on " + date.toDateString())
            navigate('/')
        }

    }

    return (
        <div className="register">
            <h2 className="ls-title">User Registration </h2>

            <input className='inputBox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' required />

            <input className='inputBox' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <input className='inputBox' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />

            <button onClick={collectData} className='appbtn' type="button" >Sign Up</button>
            <Link to="/login" className="inorup"><p>Already registered? </p></Link>
        </div>
    )
}
export default Signup;