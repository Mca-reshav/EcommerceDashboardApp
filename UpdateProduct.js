import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        //console.log(params)
        let result = await fetch(`http://localhost:5600/update-product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setName(result.name);
        setCompany(result.company);
        setCategory(result.category);
        setPrice(result.price);

    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5600/update-product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, company, category, price }),
            headers: { "Content-Type": "application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        });
        result = await result.json();
        console.log(result.acknowledged);
        alert("Record is updated successfully")
        navigate('/')

    }

    return (
        <div className="register">
            <h2 className="ls-title">Update Product</h2>

            <input className='inputBox' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Product Name' />

            <input className='inputBox' type='text' value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter Company' />

            <input className='inputBox' type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter Category' />

            <input className='inputBox' type='text' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter Price' />


            <button onClick={updateProduct} className='appbtn' type="button" >Update</button>
            <p>If you want to see the product list <Link to="/"><button className="re-direct">Click Me</button></Link></p>
        </div>
    )
}
export default Update;