import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import QuickView from './Component/QuickView';
import Card from './Component/Card';
import Pagination from './Component/Pagination';
import Navbar from './Component/Navbar';
import Cart from './Component/Cart';
import { Route, Routes } from 'react-router-dom';
import Checkout from './Component/Checkout';
import Home from './Component/Home';
import Done from './Component/Done';
import Liked from './Component/Liked';

function App() {
  const [cart, setCart] = useState(false);
  const [liked, setLiked] = useState(false);
  const [render, setRender] = useState(false);
  return (
    <div className="App">
      
      <Navbar liked={liked} setLiked={setLiked} cart={cart} setCart = {setCart}/>
      <Routes>
        <Route path='checkout' element={<Checkout />}/>
        <Route path='/' element={<Home render={render} setRender={setRender}/>}/>
        <Route path='done' render={render} setRender={setRender} element={<Done/>}/>
      </Routes>
      {cart ? <Cart cart={cart} setCart = {setCart}/> : <></>}
      
      {liked ? <Liked liked={liked} setLiked={setLiked}/> : <></>}
    </div>
  );
}

export default App;
