import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct'
import ProductList from './Components/ProductList'
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login'
import PageNotFound from './Components/PageNotFound';
import Profile from './Components/Profile';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/profile' element={<Profile/>} />
          </Route>

          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
      <Footer /> 
    </div>
  );
}

export default App;
