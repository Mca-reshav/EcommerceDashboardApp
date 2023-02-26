import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5600/product-list",{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5600/product/${id}`,
            { method: "delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            } })
        result = await result.json();
        if (result) {
            getProducts();
            alert("Record is deleted successfully")
        }
    }
    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5600/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if(result){
                setProducts(result)
            }
            
        }else{
            getProducts()
        }
    }
    return (
        <div className="product-list">
            <h2 className="title">Product List</h2>
            <input type="text" className="search-box" placeholder="Search Products" onChange={searchHandle} />
            <ul className="ul-top">
                <li>S.No</li>
                <li>Name</li>
                <li>Company</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operations</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => <ul key={item._id} className="data-li">
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.company}</li>
                    <li>Rs.{item.price}</li>
                    <li>{item.category}</li>
                    <li><button onClick={() => deleteProduct(item._id)} className="delbtn">Delete</button>
                        <Link to={"/update/" + item._id}><button className="editbtn">Edit</button></Link></li>
                </ul>) : <h1>Sorry,No Result Found</h1>
            }
        </div>
    )
}
export default ProductList;