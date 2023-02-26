import React, { useState } from "react";
import { Link } from "react-router-dom";
const App=()=>{
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[category,setCategory]=useState('');
    const[company,setCompany]=useState('');
    const[count,setCount]=useState(0)
    const[error,setError]=useState(false)

    const addProduct=async()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false
        }
        const userId=JSON.parse(localStorage.getItem('key'))._id;
        //console.log(userId._id);
        let result=await fetch("http://localhost:5600/add-products",{
            method:"post",
            body:JSON.stringify({name,price,company,category,userId}),
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            })
            result=await result.json();
            if(result){
                alert(result.company +" "+ result.name+" is added successfully")
            }
            console.log(name,price,category,company,userId);
            setCount(count+1)
            
        }

    return(
        <div className="register">
            <h2 className="add-title">Add Product </h2>
            <p className="attention">Total products added: <b>{count}</b></p>

            <input  className='inputBox' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' />
            {error && !name && <span className="invalid-input">* Fill this please</span>}

            <input  className='inputBox' type='text' value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter Price' />
            {error && !price && <span className="invalid-input">* Fill this please</span>}
            
            <input  className='inputBox' type='text' value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category' />
            {error && !category && <span className="invalid-input">* Fill this please</span>}

            <input  className='inputBox' type='text' value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter Company' />
            {error && !company && <span className="invalid-input">* Fill this please</span>}

            <button onClick={addProduct} className='appbtn' type="button" >Add</button>

            <p>If you want to see the product list <Link to='/' ><button className="re-direct">Click me</button></Link></p>
        </div>
    )
}
export default App;