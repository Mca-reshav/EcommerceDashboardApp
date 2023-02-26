import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('key')

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    
    return (
        <div className="App">
            <p className="banner">E-Commerce Dashboard
            <img src="https://e7.pngegg.com/pngimages/458/56/png-clipart-logo-building-business-house-buildings-angle-company.png" alt="logo" className="logo"/>
            </p>
            {
                auth ?
                    <ul className="nav-ul">
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add Product</Link></li>
                        <li><Link to="/update/">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                    </ul> :
                    <ul className="nav-ul right-nav">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
            }
        </div>
    )
}
export default Nav;