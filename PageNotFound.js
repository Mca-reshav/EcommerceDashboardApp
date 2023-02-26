import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App'
const PageNotFound = () => {
    const[data,setData]=useState(0)
    const navigate=useNavigate()
    const click=()=>{
        setData(data+1)
    }
    setTimeout(click,1000)
    if(data>4){
        navigate('/')
    }
    const hit=()=>{
        navigate('/')
    }
    return (
    <div className="App">
       <h3>Oops! You have visited to the wrong page, so you will automatically get navigated to the product page in 5secs</h3>
       <h1 style={{color:"red"}}>{data}</h1>
       <h3>If you want to go product page manually then click on below</h3>
       <button onClick={hit} className="re-direct">Navigate</button>
    </div>

    )
}
export default PageNotFound;